# ADR1: Use Github over Trello for managing project boards

Managing projects using boards makes it easy to track the progress of the project. It helps  with identifying what  tasks should be done, which are in progress and which are completed. Both Trello and Github provide these features, however we believe that Github is most favourable because we are already using it for our project repository. 

Trello is easy to use and has a great interface, however it is not in any way linked to our project repo. This means that we have to manually update the status of all issues to track down the progress. Github on the other hand, can automatically update the status of issues.  When an assignee has completed their tasks and have requested a pull request, upon approval by the respective reviewers, it automatically closes the issue and updates the status to Done. We can also assign team members to certain tasks and link issues to milestones. 

## Decision

We have decided to use Github to manage our project boards.

## Status

Accepted

## Consequences

    * Some teams members find Github to be a bit complex for managing project boards, so we will have to learn about it.
    * We do not have to worry about making mistakes when updating the status of issues because it will automatically be done for us.

