# Décisions techniques

Des micro ADR (Architecture Decision Records) pour documenter les décisions techniques majeures, les alternatives considérées, et le rationale derrière chaque choix.

## Structure du projet

- Feature based folder structure pour isoler les fonctionnalités, limiter la portée des changements, diff et faciliter l'onboarding. Chaque feature contient ses composants, services, tests, etc. Les dépendances "core" partagées et autres "utils" sont identifiées clairement et limités.

Alternatives considérées:

- Flat structure par défaut Vue
- Atomic design
- DDD / Clean Architecture

## Typage et qualité des contributions

- Tests, linting, type checking sur chaque push et PR.
- Husky pour les pre-commit hooks (linting, format, type-check, commit message).
- TypeScript pour le typage statique et la sécurité des types, avec génération automatique des types API via OpenAPI.
- Adoption de Conventional Commits pour des [commits clairs](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) et une livraison incrémentale.
- Un audit de CVE automatisé via npm audit dans la CI.

Évolutions envisagées:

- [ESlint CSS](https://eslint.org/blog/2025/02/eslint-css-support/) ou Stylelint pour le linting des styles.
- [eslint-plugin-vuejs-a11y](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility) pour l'accessibilité.
- [Trivy](https://github.com/aquasecurity/trivy-action) scan pour les vulnérabilités plutôt que npm audit.
- Dependabot pour les mises à jour de dépendances.

## Eco-conception / Performance

**Code splitting** - Automatique au niveau du routeur via Unplugin Vue Router pour ne charger que le code nécessaire à chaque page.

**Caching et optimisation réseau** - Lazy fetching et caching de la donnée API avec Tanstack Query pour minimiser les appels réseau et améliorer la réactivité de l'application.

Expérimentations:

- [Rolldown](https://vite.dev/blog/announcing-vite8-beta): bundler Rust pour Vite en beta, potentiellement plus performant que esbuild. -> A posé souci avec Cypress, voir [ici](https://github.com/cypress-io/cypress/issues/32550).
- [Vue Vapor](https://github.com/vuejs/core/releases/tag/v3.6.0-beta.1) pour shipper moins de JS. Ne fonctionne pas tel quel.
- [Foresight.js](https://foresightjs.dev/) ou quicklink: préchargement intelligent des ressources pour optimiser la navigation. -> A tester.

Évolutions envisagées:

- Utiliser des librairies comme [Dicebear](https://www.dicebear.com/styles/shapes/) ou [Geopattern](https://btmills.github.io/geopattern/) pour générer des visuels dynamique légers (avatars, patterns, etc).

## Routing

- Vue Router et [unplugin Vue Router](https://uvr.esm.is/why.html) pour du routing typé avec génération automatique et le code splitting. Auto documente. Ajoute de la complexité face a un routeur classique mais moins de travail manuel, proche de Nuxt.

Alternatives considérées:

- Vue Router classique seul: Simple mais pas de typage ni au niveau des routes ni au niveau des params. code splitting manuel pouvant être oublié, déclarations manuelles verbeuses et sujettes aux erreurs [listées ici](https://router.kitbag.dev/introduction.html#why-does-vue-need-a-new-router).
- [KitBag Router](https://router.kitbag.dev/introduction.html): trop jeune, tres typé mais Unplugin Vue Router plus mature et mieux maintenu.
- Pas de router : rapide mais ne scale pas du tout pour une application de 3+ pages.
- Nuxt 4: hors sujet, contrainte Vue.js 3 + Vite.

## Data fetching

- Tanstack Query pour la donnée API avec caching, synchronisation, et gestion des erreurs. Les retours API sont typés via OpenAPI. Isole la couche donnée et amène de la donnée typée et fiable aux composants et pages.

Alternatives considérées:

- [Pinia Colada](https://pinia-colada.esm.dev/why.html) moins mature, clone de Tanstack Query.
- Pinia Colada et son intégration avec Unplugin Vue Router via les [data loaders](https://uvr.esm.is/data-loaders/colada/), on s'approche de Nuxt, en moins mature.
- Utilisation directe de fetch dans les composants de fetch/Axios: trop verbeux, violation du principe de SRP.
- Gérer manuellement le caching, la synchronisation et les erreurs via une composable: réinventer la roue.

## State management

Pinia pour le state management global UI (token, profil utilisateur, modales): léger, connu, bien intégré dans l'écosystème Vue, supporte TypeScript nativement. Limité au strict nécessaire pour éviter la complexité du Flux Pattern.

Alternatives considérées:

- State management simple via Vue en utilisant `ref` ou `reactive` pour le state global: léger, artisanal mais dangereux si mal utilisé (fuites mémoires, réactivité non maîtrisée).
- Vuex : [Obsolete](https://vuex.vuejs.org/#what-is-vuex) et verbeux.

## Sécurité

**Stockage du token** - En mémoire uniquement (pas de sessionStorage) pour éviter les risques XSS. L'API SpaceTraders ne supporte pas l'authentification par cookie. Tradeoff assumé : sécurité > UX (token perdu au refresh).

**Protection des routes** - Auth guards sur les routes nécessitant authentification via `router.beforeEach`.

**Gestion des erreurs API** - Middleware sur le client API qui intercepte les 401 pour déconnecter automatiquement l'utilisateur et invalider le cache.

**Secrets** - Pas de secrets commités. Les tokens sont fournis par l'utilisateur via le formulaire d'authentification.

Évolutions envisagées:

- Stockage du token dans le Session Storage pour améliorer l'UX (persistance au refresh) avec opt-in utilisateur.

## Testing

**Typage statique** - Valider la bonne intégration avec l'API via du typage issu des contrats OpenAPI.

**Tests d'intégration** - Tester l'integration des pages, composants et les parcours utilisateur via Cypress. Couvre les interactions avec l'API via des mocks basés sur les contrats OpenAPI. Des selecteurs fournis par testing-library centrés sur le comportement utilisateur pour des tests robustes et maintenables qui poussent les bonnes pratiques d'accessibilité.

Alternatives considérées:

- Playwright: similaire, choix personnel par familiarité. Du pareil au même.
- Vitest + Testing Library Vue: plus léger mais aucune UI pour le debugging ou l'inspection des composants ou page.

**Tests unitaires** - Tester les composants Vue via Cypress Component Testing.

Alternatives considérées:

- Vitest Browser Mode et Component Testing: plus léger mais moins connu que Cypress CT.
- Tester la logique via Vitest seul: oui si besoin mais peu probable dans le scope front-end.
- Storybook testing: overkill pour le scope.

## CSS et styling

- CSS Modules pour le scoping strict des styles par composant et le typage. Simple, intégré nativement dans Vite, pas de dépendance externe. Sémantique claire avec des classes nommées. Verbeux mais explicite et simple a comprendre.

Avec un design planifié, des design tokens via CSS variable en temps voulu pour éviter les [magic numbers](https://martinfowler.com/articles/design-token-based-ui-architecture.html).

Alternatives considérées:

- Tailwind CSS: rapide, règle le beaucoup de problèmes, DRY mais ajoute de l'abstraction. Pourquoi pas.
- UnoCSS: proche de Tailwind et [plus performant](https://antfu.me/posts/reimagine-atomic-css#performance) mais moins connu.
- CSS-in-JS reboot avec [PandaCSS](https://panda-css.com/docs/overview/why-panda#the-new-era-of-css-in-js) et Class Variance Authority (CVA): typé, intéressant, CSS module et stylelint font le job en plus simple.
- BEM: verbeux, complexe, facile a utiliser de travers.
- CSS global ou scoped css: simple mais risque de conflits de styles et de fuites.

## Librairie UI

- Pas de librairie pour l'instant car pas besoin urgent. PrimeVue par la suite, typé, complet et personnalisable.

Alternatives considérées:

- Daisy UI: visuellement fun pour du gaming, parfait pour le prototypage ou le PoC, non typé, lié à Tailwind CSS.
- Nuxt UI: basé sur Reka, intéressant, lié à Tailwind CSS.
- Reka UI: ultra flexible, nécessite de la personnalisation.
- Vuetify: Complet, mature, mais verbeux et rigide.
- Ant Design Vue: Complet, orienté entreprise.
- Element Plus: Orienté entreprise.

## Release et déploiement

Via une CI/CD légère sur GitHub Actions:

- Build et déploiement sur GitHub Pages via une action dédiée sur chaque push vers la branche main.

Évolutions envisagées:

- Auto génération du CHANGELOG.md et release et déploiement via semantic commit et semantic release
- De l'observabilité
- User analytics pour suivre l'adoption des fonctionnalités développées.
- De l'internationalisation via vue-i18n.
- 3-4 smoke tests automatisés post-déploiement.

## Documentation

- Documentation rapide via des fichiers markdown dans le dossier docs pour partager la vision, les choix techniques, et faciliter l'onboarding.

Alternatives considérées:

- Architecture Decision Records (ADR) complets pour formaliser chaque décision technique.
- VitePress ou Docusaurus pour une documentation plus complète et structurée.

## Références

- [OpenAPI - Why API First?](https://openapistack.co/docs/api-first/)
- [Tanstack Query - Motivation](https://tanstack.com/query/latest/docs/framework/react/overview#motivation)
- [Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Testing Library - Guiding Principles](https://testing-library.com/docs/guiding-principles/)
- [Jack Franklin - Components on the Web - SoC](https://vimeo.com/364384932?fl=pl&fe=cm#t=2m4s)
- [Cristiano Rastelli - Let there be peace on CSS - SoC](https://youtu.be/FmGWw7c7iZE?t=878)
- [Vue Style Guide - Component Design](https://vuejs.org/style-guide/#Component-Design-Strongly-Recommended)
- [Vue Router - TypeScript Support](https://router.vuejs.org/guide/advanced/typed-routes.html#Typed-Routes-)
