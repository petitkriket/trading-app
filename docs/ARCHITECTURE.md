# Architecture Overview

## Choix

### "Front-end skills"

- Une librairie UI pour shipper vite avec une surface de code réduite.
- Un State management minimal de la donnée client (token et profil utilisateur, modales, etc) avec Pinia ou une composable stateful.
- Data fetching avec Vue Query la gestion de la donnée API.
- Best effort sur le design, pas de DA mais un minimum d'accessibilité et des fonctionnalités d'abord (le fond plutôt que la forme).

### "Design a modular and scalable architecture"

- Separation des responsabilités entre la couche UI d'un coté, la donnée API, et la gestion de
- Une approche API First avec OpenAPI pour cadrer les interactions front/back et limiter les erreurs de contrat. Les types sont générés automatiquement via openapi-generator-cli.
- "Feature based" folder structure pour aller vers l'isolation, limiter la portée des changements et faciliter l'onboarding.
- "Feature based" pour identifier clairement les dépendances "core" partagées et autres "utils" et les limiter.
- Code splitting automatique au niveau du Routeur pour ne charger que ce qui est nécessaire.
- Lazy fetching et caching de la donnée API avec Vue Query pour minimiser les appels réseau et améliorer la réactivité de l'application.

### "Rigor in terms of software quality"

- Consistence dans le style de code via ESLint + Prettier.
- Best practices Vue et JS
- Best practice testing et couverture testing pour créer de la confiance (le coverage importe peu).
- Adoption du language omniprésent métier ( "Ubiquitous language"): on parle le language métier back/front/produit/métier.
- On fait du SOLID avec pragmatisme, parfois WET vu la contrainte de temps. Parfois, simple c'est bien.

### CI/CD

- Des commits clairs via semantic commit
- Des commits et de la livraison incrémentale pour favoriser la comprehension et éviter les regressions.
- On automatise les taches manuelles: type check, linting, testing, orthographe...
- Type checking pour rester collé a l'API le plus tot possible.
- Linting on save et via Husky.
- Pre-commit hooks avec Husky (sauf déploiement une CI lourde pour un seul dev c'est YAGNI)

### Testing

Le testing trophy de kent c odds avec une approche pragmatique: - static type checking / testing pour limiter les erreurs de contrat d'APIs internes ou externes. - tests intégration qui s'appuie sur les contrats API. - tests end-to-end tests pour les parcours critiques (smoke test) - component tests pour la logique d'affichage pour les composants "fait maison" - on compte sur les librairies open source (couvertes et testées par les mainteneurs). - unit tests pour le métier si il y en a (peu probable et indésirable, métier dans le backend de préférence).

### Documentation

C'est une documentation rapide. Alternatives sont un VitePress et des "Architecture Decision Records" (ADR).Les objectifs de ce document sont les suivants:

- Faciliter l'onboarding et la contribution
- Partager la vision et les choix d'architecture
- Capitaliser sur et/ou challenger les choix techniques pour trouver mieux (lean)

## Laboratoire

- On essaie rolldown vite en beta pour voir ce que ca donne [voir](https://vite.dev/blog/announcing-vite8-beta)
- On essaie foresight.js ou quicklink pour l'optimisation du chargement des ressources [voir](https://foresightjs.dev/)

## Hors scope vu les requirements et le temps disponible

- une CI pour garantir le respect des règles de qualité de code. (lint, test, typecheck)
- Analyse de la performance et optimisation avancée
- un SAST et un CVE scanner trivy + npm audit sur la CI.
- Auto génération du CHANGELOG.md et release et déploiement via semantic release
- L'accessibilité avancée (WCAG 2.1 AA)
- L'internationalisation
- Monitoring et analytics produit
- Le SEO (limité sur une Single Page App derriere un authentification)

## References et rationale:

- [OpenAPI - Why API First?](https://openapistack.co/docs/api-first/)
- [Tanstack Query - Motivation](https://tanstack.com/query/latest/docs/framework/react/overview#motivation)
- [Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Testing Library - Guiding Principles](https://testing-library.com/docs/guiding-principles/)
- [Jack Franklin - Components on the Web - SoC](https://vimeo.com/364384932?fl=pl&fe=cm#t=2m4s)
- [Cristiano Rastelli - Let there be peace on CSS - SoC](https://youtu.be/FmGWw7c7iZE?t=878)
- [Vue Style Guide - Component Design](https://vuejs.org/style-guide/#Component-Design-Strongly-Recommended)
- [Vue Router - TypeScript Support](https://router.vuejs.org/guide/advanced/typed-routes.html#Typed-Routes-)
