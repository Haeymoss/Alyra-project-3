<h1 align="center">FORMATION ALYRA - PROJET N°3</h1>
<h1 align="center">Réalisation de la DApp du smart contract "Voting"</h1>
<h2 align="center" style="color:#AEFAFA;">Nino GUÉGUEN & Rui DA SILVA AFONSO - Promo Lovelace (2024)</h2>

![Alt text](assets/Voting.webp)

---

## Pour correction :

- Lien vidéo :
- Lien Déploiement sur Sépolia : 

### Sécurité & optimisation du smart contract

Dans la première version de Voting.sol, le décompte des votes dans la fonction "tallyVotes" entrainait un problème de "DOS / Gas limit". La fonction utilisait un boucle pour parcourir toutes les propositions et déterminer celle avec le plus grand nombre de vote. Cela peut poser problème si un attaquant ajoute un grand nombre de propositions, le smart contract arriverait à sa limite de gas pour 1 transaction et cela empecherait le bon déroulé du protocole.
Pour résoudre ce problème nous avons ajouté une condition dans la fonction "setVote" qui permet de mettre à jour à chaque vote la proposition gagnante :

if (
    proposalsArray[_id].voteCount >
    proposalsArray[winningProposalID].voteCount
) {
    winningProposalID = _id;
}

Niveaux bonnes pratiques nous avons ajouter des NatSpec ce qui permet de compléter le contrat en décrivant les fonctions afin de générer de la documentation détaillée. 

### Front
Voici la liste de la stack utilisée pour la réalisation du projet
- Framework : Next.js
- Librairie : React.js avec ChakraUI
- Outil de liaison avec le smart contract : Wagmi & Rainbowkit
- Wallet : Metamask
- Déploiement public : Vercel

## Description du smart contract "Voting"

Ce smart contract implémente un système de vote avec différentes phases gérées par des états. Voici une description étape par étape de son fonctionnement :

### Initialisation

- Défini avec Solidity version 0.8.20 et hérite d'`Ownable` d'OpenZeppelin pour la gestion des permissions.
- Initialise les variables et les structures nécessaires pour les votes, les propositions, et le statut du workflow.

### Structures et Variables

- `Voter`: Pour enregistrer si un électeur est inscrit, a voté, et l'ID de la proposition pour laquelle il a voté.
- `Proposal`: Pour stocker la description d'une proposition et son nombre de votes.
- `WorkflowStatus`: Enum pour représenter les différents états du processus de vote.
- `winningProposalID`: Pour stocker l'ID de la proposition gagnante.

### Modificateurs

- `onlyVoters`: Assure que seuls les électeurs inscrits peuvent exécuter certaines fonctions.

### Fonctions Principales

#### Gestion des électeurs

- `addVoter`: Enregistre un nouvel électeur. Nécessite que l'adresse ne soit pas déjà enregistrée et que la phase d'enregistrement soit active.

#### Gestion des propositions

- `addProposal`: Permet à un électeur inscrit d'ajouter une proposition. Nécessite que la phase d'enregistrement des propositions soit active.

#### Gestion du vote

- `setVote`: Permet à un électeur inscrit de voter pour une proposition. Vérifie que la session de vote est active, que l'électeur n'a pas déjà voté, et que la proposition existe.

### Gestion des états

- `startProposalsRegistering`, `endProposalsRegistering`, `startVotingSession`, `endVotingSession`, `tallyVotes`: Fonctions pour passer d'un état à l'autre du workflow. Chacune vérifie que le changement d'état est permis et met à jour le statut du workflow.

### Événements

- Émet divers événements pour le suivi des actions clés comme l'enregistrement des électeurs, le changement de statut du workflow, l'enregistrement des propositions, et les votes.

### Conclusion

Ce smart contract permet de créer et de gérer un processus de vote en plusieurs étapes, de l'enregistrement des électeurs à la compilation des votes, avec des contrôles d'accès et des vérifications d'état pour assurer l'intégrité du vote.

## Résultats

