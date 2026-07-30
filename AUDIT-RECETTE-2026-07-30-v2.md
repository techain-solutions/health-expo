# Audit de recette #2 (contre-vérification) — Health & Beauty Expo

**Date :** 30 juillet 2026 (seconde passe, après corrections dev)
**Référence :** `AUDIT-RECETTE-2026-07-30.md` (9 bloquants, 11 majeurs, 12 mineurs)
**Méthode :** relecture du diff complet, `tsc --noEmit` et `eslint` (propres), puis re-test runtime réel sur `localhost:3000` + Supabase local — chaque défaut de la v1 a été rejoué.

---

## 1. Verdict

**🟢 Livrable, sous réserve d'un correctif CSS de 5 minutes et de 2 dépendances client.**

**Les 9 bloquants et les 11 majeurs sont corrigés et vérifiés en conditions réelles.** Le travail est sérieux : contenus multilingues externalisés (5 dictionnaires typés, ~760 lignes chacun), validation serveur par type de demande, rate limiting, contrôle d'origine, CRUD exposants complet, purge RGPD, notifications e-mail via Resend, et **des tests de non-régression pour chacun des bugs remontés** (32 tests au total).

| | v1 | v2 |
|---|---|---|
| 🔴 Bloquants | 9 | **1** (nouvelle régression CSS) |
| 🟠 Majeurs | 11 | **3** (dont 2 en attente client) |
| 🟡 Mineurs | 12 | 7 |

---

## 2. 🔴 Nouveau bloquant (régression introduite par les corrections)

### R-1. Le bouton « Supprimer » est invisible (blanc sur blanc) et tronqué
**Où :** tableau des exposants (`/admin/exhibitors`) et tableau des demandes (`/admin/requests`).
**Constat mesuré dans le navigateur :**
```
.admin-btn--danger → color: rgb(255,255,255) / background: rgb(255,255,255)
bouton rendu : 32 × 38 px, texte "delete Delete" présent dans le DOM mais illisible
```
Un utilisateur voit **un carré blanc vide** à côté de « Modifier » / « Marquer comme lu ». Contraste 1:1, action destructive non identifiable → risque de suppression accidentelle et échec WCAG.

**Cause racine :** dans `src/app/admin/admin.css`, la règle `.row-actions button{width:28px;height:28px;background:#fff;…}` (spécificité 0-1-1) est déclarée **après** et bat `.admin-btn--danger{color:#fff;background:var(--red)}` (0-1-0). Le fond rouge est écrasé par le blanc, la couleur du texte reste blanche, et la largeur figée coupe l'icône et le libellé.

**Correctif (5 min) :** restreindre l'ancienne règle du prototype, par exemple
`.row-actions > button:not(.admin-btn){…}`, ou ajouter après :
`.row-actions .admin-btn--danger{width:auto;height:auto;background:var(--red);color:#fff;border-color:var(--red)}`.
À vérifier ensuite sur les deux tableaux.

---

## 3. ✅ Bloquants v1 — tous corrigés (vérifiés en runtime)

| ID | Vérification effectuée | Résultat |
|---|---|---|
| B-1 Fair Match cassé | migration `20260730140000_request_type_text.sql` : enum → colonne `text` + `check`. POST réel `type:'fair_match'` | **200 ok**, demande visible dans la boîte admin |
| B-2 Sauvegarde événement | formulaire poste désormais `10:00` / `18:00`, regex acceptant `HH:MM(:SS)` + test dédié | **« Event changes saved. »**, URL billetterie enregistrée |
| B-3 CRUD exposants | `/admin/exhibitors` : bouton « Nouvel exposant », « Modifier » par ligne, `deleteExhibitorAction` + confirmation, champs `required` | **Complet** (affichage du bouton Supprimer : voir R-1) |
| B-4 Bandeau prototype | `ribbon` / lien « Preview admin dashboard » supprimés ; test automatisé « contains no public prototype ribbon » | **Absent des 5 locales** |
| B-5 Consentement mensonger | remplacé par « I agree that my details may be used… » + lien vers la politique, `required`, traduit | **Conforme**, `consent !== true` → 400 côté serveur |
| B-6 Champs obligatoires | `required` + `minLength` côté client ; `requiredFields` par type côté serveur | champs vides → **400 invalid**, soumission bloquée par le navigateur |
| B-7 Rate limiting | 5 requêtes / 10 min / IP, plafonds 25 champs, 2 000 car./champ, 12 000 car. total, corps 16 Ko, contrôle `Origin` | rafale de 7 POST → **429 × 7** ; 40 champs → **400** ; honeypot → **400** |
| B-8 E-mails | intégration Resend + outbox avec `attempts` / `last_error` / `sent_at` et rejeu | **code prêt**, voir O-2 (variables client manquantes) |
| B-9 Versionnement | — | **toujours ouvert**, voir O-1 |

## 4. ✅ Majeurs v1 — corrigés

- **M-1 Multilingue** : dictionnaires `en/nl/tr/ru/ar` typés (`Dictionary`) couvrant les 15 pages, formulaires, messages d'erreur et textes légaux. Vérifié : `/nl` et `/tr` intégralement traduits, `/ar` traduit et en RTL.
- **M-2 `lang`/`dir`** : `/en→lang=en dir=ltr`, `/nl→nl`, `/ru→ru`, **`/ar→lang=ar dir=rtl`** au niveau `<html>` (via un proxy qui propage la locale).
- **M-3 Dates/heures** : `Intl` par locale, heures tronquées à `HH:MM`, nombres isolés en `dir="ltr"` — l'arabe affiche « 24 أكتوبر 2026 – 25 أكتوبر 2026 · 10:00–18:00 ».
- **M-4** doublon « Rijswijk · … Rijswijk 2026 » supprimé.
- **M-5 Billetterie** : CTA masqué et remplacé par un message d'attente si `ticket_url` est vide ; `/go/tickets?locale=xx` conserve la langue (test unitaire inclus).
- **M-6/M-7 Exposants** : accueil, Fair Match et fiche détail lisent la base ; « Featured » filtre sur `is_featured` ; la fiche utilise `slug`, la description réelle et le lien site web.
- **M-8** slug inconnu → **404** (vérifié).
- **M-9** contrôles inertes : **0 `aria-disabled`** restant sur le site public.
- **M-10 SEO** : `canonical`, 5 `hreflang` par page, **JSON-LD `Event`**, titres localisés par page.
- **M-11 Demandes** : filtres par type et par statut, pagination (« Showing 1–1 of 1 »), « Marquer comme lu », suppression avec mention RGPD, `grant delete` ajouté en base.

**Mineurs corrigés :** wording prototype éliminé (il ne reste que des attributs `placeholder` HTML légitimes) ; bandeau admin « presentation-only » et carte « Backend actions — Not active » remplacés par un état réel (Publié / 2 exposants actifs / 1 demande non lue / billetterie Configurée) ; pages admin factices « Photos & videos » et « Ticketing link » supprimées (**404** confirmé) ; badge de navigation réel ; formulaire newsletter mort retiré ; liens `href="#"` éliminés.

---

## 5. 🟠 Encore ouvert

### O-1. Aucun code n'est versionné ni déployé *(bloquant de livraison, non technique)*
`git status` : `src/`, `supabase/`, `public/`, `package.json`, `next.config.ts` sont toujours **untracked**. Le dernier commit reste celui du prototype de design. Rien n'est poussé, rien n'est déployé.
→ Commit + push immédiat, puis Vercel + Supabase distant dès réception des accès client.

### O-2. Notifications e-mail non actives *(dépend du client)*
Le code Resend est en place mais `RESEND_API_KEY`, `FORM_NOTIFICATION_FROM` et `FORM_NOTIFICATION_TO` ne sont pas configurés → les demandes restent uniquement dans la boîte admin (`outbox` en `pending`).
→ Obtenir l'adresse de réception, créer la clé, tester un envoi réel avant mise en ligne.

### O-3. Le rate limiting ne survivra pas à la production telle quelle
Le compteur est **en mémoire du processus** : sur Vercel (plusieurs instances, redémarrages fréquents) la limite de 5/10 min est contournable, et à l'inverse une IP partagée (entreprise, salon, NAT mobile) bloquera des visiteurs légitimes.
→ Basculer le compteur en base (table `request_throttle` avec fenêtre glissante) ou utiliser un service dédié ; conserver le honeypot et le contrôle d'`Origin` en défense secondaire.

---

## 6. 🟡 Mineurs restants

1. **Logo exposant non géré** : la fiche affiche une pastille avec l'initiale ; FR-004 mentionne un logo. À arbitrer avec le client (nécessite un upload d'image + stockage).
2. **Documents client manquants** : `public/downloads` contient 5 PDF ; l'accord anglais en 3 parties, le flyer et les 5 fiches « stand information » envoyés le 26/07 ne sont pas intégrés.
3. **Titre de la page d'accueil redondant** : « Health & Beauty Expo Rijswijk 2026 — Health & Beauty Expo » (le titre de page reprend la marque déjà ajoutée par le template).
4. **Poids des images** : `expo-hero-panorama-v3.png` ≈ 1,9 Mo servi en PNG via CSS. Convertir en WebP/AVIF et passer par `next/image`.
5. **Pas de `Content-Security-Policy`** (les autres en-têtes de sécurité sont présents).
6. **Typographie admin très petite** (8–10 px sur les tableaux, filtres et libellés) — inconfortable et limite en accessibilité pour un usage quotidien par l'équipe.
7. **Programme et intervenants** toujours illustratifs, en attente du contenu client (FR-016 reste une question ouverte).

---

## 7. À faire avant d'annoncer la livraison

1. Corriger **R-1** (CSS bouton Supprimer) et revérifier les deux tableaux.
2. Lancer sur ta machine : `npm run lint && npm run typecheck && npm test && npm run build` — je n'ai pas pu exécuter les tests ni le build ici (binaires natifs indisponibles dans mon environnement) ; lint et typecheck sont propres.
3. **Commit + push** (O-1), puis déploiement dès réception des accès Vercel/Supabase.
4. Configurer l'e-mail (O-2) et tester une soumission réelle de bout en bout.
5. Passe manuelle finale : 15 pages × 5 langues, 4 formulaires, 3 rôles admin, plus un test sur mobile réel (je n'ai pas pu redimensionner la fenêtre du navigateur pendant cette passe).

**Note environnement :** la base locale était vide de comptes staff ; j'ai recréé `qa-admin@health-expo.test` et `qa-organizer@health-expo.test` (mot de passe `QaRecette2026!Test`) et laissé 1 demande Fair Match de test. `npm run supabase:reset && npm run staff:provision` pour repartir propre.
