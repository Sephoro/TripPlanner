# ADR2: Use of SQL over MongoDB for database

It is important that the details of users interacting our website be stored in a secure database for later use. A database also allows the administrator to manage and have access information of users.

SQL deals with relational databases that have operations such as update, delete, query, insert. It uses a high level langauge to perform these opeartions. The database can be set up both on Azure and on the current Repo which makes it easier to work with because it is integrated in the project. SQL databases are table based which means it allows multiple row transections.

MongoDB can be implemented in various langauges. It is not linked to the Azure platform in its default state. Therefore before using it, developers needs to figure out a way of linking it to Azure platform for deployment purposes. MongoDB does not have clear schema definitions which means that its databases are not organised in a structure of any sort. 

## Decision

We have decided to use SQL for our database.

## Status

Accepted

## Consequences

    * Two members of the group are familiar with SQL and it is easy to learn because it makes use of high-level langauge.
    * SQL databases are table based which means it cannot allow data in any format but tabular format. However, it is easy to read data from a database when it is in tabular format.
