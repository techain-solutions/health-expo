# Audit de recette complète — Health & Beauty Expo (Rijswijk 2026)

**Date :** 30 juillet 2026
**Environnement testé :** `http://localhost:3000` (Next.js 16.2.12 dev) + Supabase local (`127.0.0.1:54321`)
**Périmètre de référence :** proposition commerciale validée, spec fonctionnelle validée, conversation client (15–29 juillet), `.ai/REQUIREMENTS.md`
**Méthode :** revue de code intégrale (`src/`, `supabase/migrations/`), lint + typecheck, QA navigateur sur les 5 langues, tests API réels, tests RBAC avec les 3 rôles.

---

## 1. Verdict

**❌ NE PAS LIVRER EN L'ÉTAT AUJOURD'HUI.**

Le socle technique est bon (auth Supabase + RBAC serveur, RLS, migrations tracées, design fidèle, lint et typecheck propres). Mais la recette révèle **4 fonctionnalités contractuelles cassées ou absentes** et **une couche de wording « prototype » encore visible partout sur le site public**, ce qui rend la livraison non acceptable par le client.

| Catégorie | Nombre |
|---|---|
| 🔴 Bloquants (empêchent la livraison) | 9 |
| 🟠 Majeurs (à corriger avant mise en ligne publique) | 11 |
| 🟡 Mineurs / qualité | 12 |

**Estimation de remise à niveau :** ~1,5 à 2 jours de dev pour les bloquants + majeurs. Une livraison « propre » aujourd'hui est possible uniquement sur les 9 bloquants (≈ 6–8 h) en annonçant au client une seconde passe pour les majeurs.

---

## 2. 🔴 Bloquants

### B-1. Formulaire Fair Match : 100 % cassé (échec systématique)
**Exigence :** FR-007 / FR-008 (fonctionnalité centrale demandée par le client le 22/07).
**Constat :** toute soumission Fair Match renvoie `503 {"error":"unavailable"}` → l'utilisateur voit « We could not send your request ». Aucune demande n'arrive à l'équipe.
**Cause racine :** la valeur d'enum `fair_match` n'existe pas en base. La migration `supabase/migrations/20260730121039_fair_match_request.sql` (`alter type ... add value if not exists`) n'a pas pris effet. Vérifié directement :
```
POST /rest/v1/public_requests {request_type:'fair_match'}
→ 22P02 invalid input value for enum public_request_type: "fair_match"
```
**Correction :** remplacer l'enum par une colonne `text` + `check (request_type in (...))` (le plus robuste), ou isoler l'`ALTER TYPE ADD VALUE` dans une migration exécutée hors transaction. Ajouter un test d'intégration qui insère réellement un `fair_match`.

### B-2. Enregistrement des informations de l'événement : impossible
**Exigence :** FR-015 (gestion date/heures/lieu/description/lien billetterie).
**Constat :** « Save event » échoue **toujours** avec « We could not save these event changes ». Le lien billetterie ne peut donc jamais être renseigné.
**Cause racine :** `src/lib/event/input.ts` valide les heures avec `/^\d{2}:\d{2}$/`, or le formulaire poste les valeurs telles que retournées par Postgres (`time`) : `10:00:00` / `18:00:00` → rejet.
**Correction :** normaliser à `HH:MM` au rendu (`value.slice(0,5)`) **et** assouplir la regex en `/^\d{2}:\d{2}(:\d{2})?$/`. Ajouter un test unitaire sur `10:00:00`.

### B-3. Gestion des exposants incomplète : une seule fiche éditable
**Exigence :** FR-005 (ajouter, modifier, réordonner, mettre en avant, activer/désactiver, **supprimer**).
**Constat :** `src/components/exhibitor-manager.tsx` n'expose qu'un formulaire « Edit first exhibitor » lié à `items[0]`. Impossible de : sélectionner un autre exposant, en créer un nouveau quand la liste n'est pas vide, en supprimer un, réordonner autrement qu'en éditant le premier.
**Correction :** ajouter un lien « Modifier » par ligne (`?id=`), un bouton « Nouvel exposant », une action `deleteExhibitorAction` (+ grant `delete` en base) et une confirmation. C'est le poste de correction le plus lourd (~2–3 h).

### B-4. Bandeau et lien « prototype » visibles sur le site public
**Constat :** chaque page publique affiche en haut « CLIENT VALIDATION PROTOTYPE » / « PROTOTYPE VOOR KLANTVALIDATIE » et un lien **« Preview admin dashboard »** vers l'administration. Pied de page : « Client validation concept ».
**Correction :** supprimer le ruban et le lien admin de `src/components/public-shell.tsx` (et les clés `ribbon`/`admin` de `shellCopy`).

### B-5. Case à cocher mensongère sur des formulaires qui envoient réellement les données
**Constat :** les 4 formulaires actifs (contact, participation, accréditation, Fair Match) affichent : *« I confirm this is a presentation-only form and no details will be sent »* — alors que les données **sont** stockées en base. Risque juridique/RGPD direct.
**Fichier :** `src/components/static-form.tsx`.
**Correction :** remplacer par un vrai consentement (« J'accepte que mes données soient utilisées pour traiter ma demande — voir la politique de confidentialité »), `required`, traduit dans les 5 langues.

### B-6. Aucune validation de champ obligatoire
**Exigence :** FR-009 (« validation des champs obligatoires »), A11Y-002.
**Constat :** tous les champs affichent un astérisque `*` mais aucun n'a l'attribut `required` ; seul l'e-mail est validé côté serveur (regex). Un POST `contact` avec `name:""` et `message:""` renvoie `200 {ok:true}`.
**Correction :** `required` + `minLength` côté client, validation par type de demande côté serveur avec messages d'erreur par champ (et conservation de la saisie en cas d'erreur).

### B-7. Aucune limitation de débit sur `/api/requests`
**Exigence :** SEC-007.
**Constat :** 12 POST consécutifs → 12 × `200`. Un payload de ~400 Ko (200 champs × 2 000 caractères) → `200`. Seule protection : un honeypot contournable en une ligne. Site public = spam et saturation de base garantis.
**Correction :** rate-limit par IP (ex. 5 req / 10 min, en mémoire LRU ou table Supabase), plafond du nombre de champs (≤ 25) et de la taille du corps, vérification de l'en-tête `Origin`.

### B-8. Les demandes ne partent vers personne (pas d'e-mail)
**Exigence :** FR-009 / INT-003 ; noté comme blocage dans `.ai/PROGRESS.md`.
**Constat :** les demandes sont écrites dans `request_notification_outbox` avec `status='pending'` — aucun envoi. Personne dans l'équipe n'est notifié.
**Correction :** brancher un fournisseur (Resend / Postmark / SMTP Supabase) + adresse(s) destinataire à obtenir du client, avec réessai. À défaut aujourd'hui : afficher clairement à l'équipe que la boîte « Form requests » est le seul canal, et le documenter au client.

### B-9. Aucun code applicatif n'est versionné ni déployé
**Constat :** `git status` → `src/`, `supabase/`, `package.json`, `public/`, `scripts/`, `next.config.ts` sont **non suivis** (untracked). Les derniers commits ne contiennent que le prototype de design. Aucune base local n'est provisionnée non plus : les 3 comptes de `.auth-test.local.json` n'existent plus en base (0 utilisateur), l'admin était donc inaccessible avant que j'en recrée un.
**Correction :** commit + push immédiat, puis déploiement Vercel + Supabase distant (F-013 est encore `AWAITING_EXTERNAL_DEPLOYMENT` — comptes client attendus). Documenter la séquence de bootstrap : `supabase db reset` → `npm run staff:provision`.

---

## 3. 🟠 Majeurs

### M-1. Multilingue : seules la navigation et le hero sont traduits
**Exigence :** FR-020 / NFR-004 — 5 langues, l'anglais comme version d'origine.
**Constat :** `shellCopy` (`src/lib/site.ts`) ne couvre que le menu, le hero et les libellés du pied de page. **Tout le corps des 15 pages est en anglais en dur** dans `public-pages.tsx` : `/nl/contact` affiche « Let's connect. », `/ar` affiche « Health · Beauty · Wellness », « International perspective », etc. Les messages de formulaire et les erreurs sont anglais uniquement.
**Correction :** externaliser les contenus en dictionnaires par locale (5 × ~15 pages). C'est le plus gros chantier restant ; à défaut, prévenir explicitement le client que seul le shell est traduit.

### M-2. `<html lang>` toujà `en` et pas de `dir="rtl"` au niveau document
**Constat :** `/nl`, `/ar`, `/tr`, `/ru` servent tous `<html lang="en">` sans attribut `dir`. La RTL arabe fonctionne visuellement (appliquée plus bas dans le DOM) mais l'accessibilité, la synthèse vocale et le SEO sont faux (A11Y-004, NFR-005).
**Correction :** `generateMetadata`/layout par locale, `<html lang={locale} dir=...>`.

### M-3. Dates et heures mal formatées et non localisées
**Constat :** page d'accueil publique après publication : « 10:00:00–18:00:00 » (secondes brutes) et « 24 October 2026 – 25 October 2026 » au lieu du format design « 24–25 October ». `Intl.DateTimeFormat` est figé sur `en-GB` pour les 5 langues. En arabe, la date s'affiche cassée par le bidi : « October 2026 - 25 October 2026 24 ».
**Correction :** formatter par locale, tronquer les heures à `HH:MM`, isoler les nombres en RTL (`<span dir="ltr">` / `⁦`).

### M-4. Bandeau « Rijswijk · Health & Beauty Expo Rijswijk 2026 » (doublon)
**Constat :** l'eyebrow concatène `event.city` + `event.title`, or le titre contient déjà la ville.

### M-5. Parcours billetterie en cul-de-sac
**Constat :** `ticket_url` est vide (et non enregistrable, cf. B-2). Le bouton « Open approved ticket platform » → `/go/tickets` → redirige vers `/en/tickets` : boucle sur la même page, et **forçage de la locale EN** (perte de langue). Aucun état « billetterie bientôt disponible ».
**Correction :** masquer/désactiver le CTA quand `ticket_url` est nul, conserver la locale dans le fallback.

### M-6. Exposants du site public incohérents entre les pages
**Constat :** la page `/exhibitors` lit bien la base (3 exposants), mais la section « Featured exhibitors » de l'accueil, la liste des cliniques de Fair Match et la fiche détail affichent le tableau `exhibitors` **codé en dur** dans `public-pages.tsx` (6 sociétés fictives), sans tenir compte de `is_featured`.
**Correction :** brancher ces 3 emplacements sur `managedExhibitors` et filtrer sur `is_featured`.

### M-7. Fiche exposant : contenu factice et slug non fiable
**Constat :** la fiche détail affiche « This profile demonstrates an approved logo… », « Stand A12 », « Hall A », et un bouton « Contact action preview » inerte. Le `website_url` de la base n'est jamais utilisé, le logo non plus (FR-004 exige logo + lien d'action). Le rapprochement se fait par `slugify(name)` au lieu de la colonne `slug`.
**Correction :** rendre les champs réels, utiliser `slug`, activer le lien site web.

### M-8. Slug inconnu → page 200 au lieu de 404
**Constat :** `/en/exhibitors/does-not-exist` renvoie `200` avec la fiche du premier exposant (soft 404, pénalisant en SEO).
**Correction :** `notFound()` si aucune correspondance.

### M-9. Recherche et filtres exposants non fonctionnels
**Constat :** le champ de recherche et les 5 filtres de catégorie sont `aria-disabled="true"` et sans effet. 6 contrôles inertes de ce type sur le site public (`aria-disabled`), plus des boutons « Static preview only », « Profile preview only ».
**Correction :** implémenter le filtrage (client-side simple) ou retirer les contrôles.

### M-10. SEO incomplet vs NFR-005
**Constat :** pas de `canonical`, pas d'alternates `hreflang` (essentiel pour un site 5 langues), **pas de données structurées `Event`** (explicitement demandées), titres génériques dérivés du slug (« Exhibitor Detail », « Legal »), `og.png` de 1,7 Mo. `sitemap.xml` (65 URLs) et `robots.txt` sont corrects.

### M-11. Boîte « Form requests » non exploitable en conditions réelles
**Constat :** aucune pagination, aucun filtre par type/statut, aucune suppression possible (le `service_role` n'a pas le droit `delete` → aucune purge RGPD, PRIV-002 reste ouvert), et le rendu brut du payload **casse la mise en page** dès qu'un champ est long (débordement hors tableau, constaté). Le badge de navigation affiche « 12 » en dur, indépendant du réel.

---

## 4. 🟡 Mineurs / qualité

1. **Wording prototype** : 78 occurrences de « static preview / presentation only / illustrative / prototype / not implemented » dans `src/components` — dont 48 sur les pages publiques (ex. « Review the static contact presentation », « Names and descriptions are presentation data »).
2. **Admin** : bandeau « Business buttons and fields remain presentation-only » et carte « Backend actions — Not active » alors que le backend fonctionne. Trompeur pour le client.
3. **Page admin « Ticketing link »** : écran factice (« Save preview only ») alors que le vrai champ est dans « Event information » → doublon confusant, à supprimer ou à brancher.
4. **Page admin « Photos & videos »** : upload désactivé (F-006 retiré du périmètre par le client) mais toujours présente avec des vignettes factices — à retirer du menu ou à étiqueter « hors périmètre ».
5. **Bouton « Save exhibitor » actif pour l'Organizer** alors que les champs sont désactivés (le serveur refuse bien → 403, mais l'UX est trompeuse).
6. **Réseaux sociaux** : icônes de pied de page `ig / f / in` sans URL (le client doit fournir les liens).
7. **Documents client manquants** : seuls le manuel EN, le manuel NL, l'accord NL, le plan et la grille tarifaire sont dans `public/downloads`. L'accord anglais en 3 parties, le flyer et les 5 fiches « stand information » envoyés le 26/07 ne sont pas intégrés.
8. **Programme / intervenants** : contenu 100 % illustratif (noms, portraits, horaires) — FR-016 est encore une question ouverte à trancher avec le client.
9. **Performance** : 7 images de fond en CSS (non optimisées par `next/image`, seulement 2 `<Image>`), `expo-hero-panorama-v3.png` ≈ 1,9 Mo, `og.png` ≈ 1,7 Mo. Prévoir WebP/AVIF + `next/image`.
10. **Sécurité en-têtes** : pas de `Content-Security-Policy`, pas de `Strict-Transport-Security` (Vercel l'ajoute en prod), `X-Frame-Options: DENY` OK.
11. **Qualité de code** : plusieurs fichiers écrits en lignes uniques minifiées (`exhibitor-manager.tsx`, `event-actions.ts`, `public-pages.tsx` lignes 500–670) — maintenance et relecture difficiles.
12. **Tests non exécutables en l'état** : `npm test` et `npm run build` n'ont pas pu tourner ici (binaires natifs `rolldown`/`swc` liés à la plateforme). **À relancer sur ta machine** — lint et typecheck sont propres.

---

## 5. Ce qui fonctionne (validé en recette)

- Authentification Supabase (email/mot de passe), message d'erreur non énumérant, déconnexion.
- **RBAC vérifié côté serveur avec les 3 rôles** : Organizer ne voit que 3 sections, `/admin/team` → page 403 propre, champs exposants désactivés ; Administrator a l'accès complet ; redirection `/admin/*` → `/admin/login?next=` pour les visiteurs.
- Gestion des comptes staff (F-014) : création, changement de rôle, désactivation/réactivation, Administrator initial protégé.
- Publication / retour en brouillon de l'événement : fonctionne, et le site public bascule bien sur les données gérées.
- API publique cloisonnée : `/api/event` renvoie `null` tant que l'événement est en brouillon ; `/api/exhibitors` ne renvoie que les actifs ; RLS active, `anon`/`authenticated` révoqués sur les tables sensibles.
- Routage 5 locales, RTL arabe visuellement correcte, sélecteur de langue au clavier, 404 corrects sur locale inconnue (`/fr`) et page inconnue.
- Plan de salle : affichage + « ouvrir » + « télécharger » avec repli sur l'asset fourni ; upload restreint (PDF/JPG/PNG/WebP, 10 Mo, nom de fichier contraint).
- Redirection billetterie sécurisée (schéma `http/https` uniquement, pas d'open redirect).
- `sitemap.xml`, `robots.txt` (admin exclu), `/api/health`, en-têtes de sécurité de base.
- Secrets : aucun fichier sensible suivi par git, `.env.local` et `.auth-test.local.json` bien ignorés, service role key jamais exposée en `NEXT_PUBLIC_`.

---

## 6. Plan de correction proposé (ordre d'exécution)

**Phase 1 — bloquants, ≈ 6–8 h (pré-requis à toute livraison)**
1. B-2 heures `HH:MM` (15 min) → débloque le lien billetterie.
2. B-1 enum `fair_match` → colonne `text` + `check` + test (45 min).
3. B-4 suppression ruban + lien admin public (15 min).
4. B-5 consentement réel + B-6 champs obligatoires côté client et serveur (1 h 30).
5. B-7 rate limit + plafonds de payload + contrôle d'`Origin` (1 h).
6. B-3 CRUD exposants complet (2–3 h).
7. B-9 commit/push, provisioning documenté, déploiement Vercel + Supabase (1 h, dépend des comptes client).
8. B-8 e-mail : brancher le fournisseur dès que le client donne l'adresse ; sinon documenter le repli.

**Phase 2 — majeurs, ≈ 1 jour**
M-2 (`lang`/`dir`), M-3 (dates/heures), M-4, M-5 (CTA billetterie), M-6/M-7/M-8 (exposants), M-9 (recherche/filtres), M-10 (canonical + hreflang + JSON-LD Event), M-11 (pagination/filtres/purge des demandes).

**Phase 3 — contenu et finitions**
M-1 (traduction des corps de pages via ChatGPT comme validé par le client), nettoyage des 78 mentions « prototype », retrait des écrans admin factices, intégration des documents manquants, optimisation des images, réécriture lisible des fichiers minifiés.

**Avant la mise en ligne**
`npm run lint && npm run typecheck && npm test && npm run build` sur ta machine, puis re-passe manuelle des 15 pages × 5 langues, des 4 formulaires (réception réelle en base **et** par e-mail) et des 3 rôles admin.

---

## 7. Points à demander au client aujourd'hui

1. Adresse(s) e-mail de réception des formulaires (contact, Fair Match, accréditation, participation).
2. URL de la billetterie externe.
3. URLs Instagram / Facebook.
4. Comptes Vercel + Supabase (déjà demandés le 29/07) — bloquant pour la mise en production, le domaine et le SSL.
5. Validation : les corps de page restent-ils en anglais pour la livraison intermédiaire, la traduction des 4 autres langues arrivant en phase 2 ?
6. Textes légaux (privacy / cookies / conditions) à valider avant publication.
7. Contenu du programme et des intervenants (actuellement fictif) : publier, masquer, ou garder en « à venir » ?

---

## Annexe — traces de test

- Sauvegarde événement : `opensAt=10:00:00` posté → validation refusée → `?notice=error`.
- Fair Match : `POST /api/requests {type:'fair_match'}` → `503` ; insertion directe → `22P02 invalid input value for enum public_request_type: "fair_match"`.
- Rate limit : 12 POST contact successifs → `[200 ×12]` ; payload 200 champs × 2 000 caractères → `200`.
- Champs vides : `POST {type:'contact', fields:{name:'', message:''}}` → `200 {ok:true}`.
- Locales : `/en`, `/nl`, `/ar` → tous `<html lang="en">`, aucun `dir`, aucun `canonical`, aucun `hreflang`, aucun `ld+json`.
- Slug inexistant : `/en/exhibitors/does-not-exist` → `200`. `/en/unknown-page` et `/fr` → `404` (correct).
- RBAC : Organizer sur `/admin/team` → écran 403 « You do not have permission… » ; nav réduite à Overview / Event information / Exhibitors / Floor plan.
- Base locale au démarrage de la recette : 0 utilisateur staff, 3 exposants, 1 événement en brouillon, 0 plan de salle.
- **Données de test laissées en base locale** : 3 comptes `qa-*@health-expo.test` (mot de passe `QaRecette2026!Test`) et ~15 demandes de test non supprimables (aucun droit `delete`). Lance `npm run supabase:reset` puis `npm run staff:provision` pour repartir propre.
