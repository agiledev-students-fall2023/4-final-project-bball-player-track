# Guide to Contributing


## Team Norms
### Team Values
All developers contributing to the project should be an active part of the team. Our primary mode of communication will be on our discord channel, so it is crucial that all team members check this channel frequently. Any issues should be directed to discord so that all team members can see them and whoever is available and able to help should respond to the issue as soon as possible. We will reach consensus when there are disagreements on direction by voting in our channel. If a member is failing to deliver on their obligations to the team, please refer to the agreements in **Daily Standups**. The resources outside of our team, specifically the professor and the tutor, should be contacted for help only after all team members have failed to solve a problem internally, or if there are any irreconcilable disagreements on vision or approach.

### Sprint Cadence
Our sprints are two weeks long, and our team standups are at INSERT TIME. It is expected that all developers attend all standups to keep everyone on the same page with current progress and issues.
### Daily Standups
We will adhere strictly to the agreements. First, members will not cover for other members who do not participate. Secondly, if a member who makes no progress on a task for two standups or more in a row, he will be reported to management (professor and TAs).
### Coding Standards
All team members should use [Visual Studio Code](https://code.visualstudio.com/) for editing to ensure consistent formatting. Code should be descriptive and concise, and should be reviewed by other developers before merging to main, using the git feature branch worklow method described below. Commits should be small and limited to individual features or fixes, clearly indicating the changes in the message, and only working code should be pushed. \
Also, it's imperative to recognize the importance of proper citation when using code from external sources. Not only does this practice show respect to the original authors, but it also ensures that one's work remains transparent and trustworthy. Every piece of code taken from an external source should be diligently attributed, providing clear acknowledgment of its origin. This establishes integrity in one's work and avoids potential intellectual property disputes.

## Contributions
Contributions are always welcome. 
### Environment Setup
1. Install [Node.js](https://nodejs.org/en).
### Build
#### Build the back end

1. Navigate into the `back-end` directory
1. Run `npm install` to install all dependencies listed in the `package.json` file.

#### Build the front end

1. Navigate into the `front-end` directory
1. Run `npm install` to install all dependencies listed in the `package.json` file.


### Git Workflow
In order to edit this repository, follow these steps.
> - Clone it to your computer. 
> - Before making changes, pull the latest code from the shared repository, then create and check out a new branch. Your coding style should be consistent with ours.
> - Make your changes, add and commit the changes to your local branch, then pull the main branch of the shared repository and merge it with the local branch. 
> - Finally, push your branch to the shared repository and create a pull request for this branch in github.
### Rules of Contributing
One of our team members will then pull and review this new code before it is merged with main. All code will be reviewed, and none will be added directly to the main branch without being seen by other team members. Changes should all be relevant to a specific user story, task, or spike, which should be mentioned in the commit message after changes are made. Additionally, developers should update the github task board by moving tasks or spikes to "In Process" while working, "Awaiting Review" after making a pull request, and "Done" once a change is merged to main. 

