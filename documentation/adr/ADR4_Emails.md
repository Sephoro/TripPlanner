# ADR4: Sending emails with Nodemailer over Sendgrid

Iniviting friends and family to share itineraries requires a communication channel to notify them when an invitation is sent. Inivitations must be made available to both registered and not registered users to  encourage people to sign-up. This was achieved through a mailing system as well as displaying invitations on the website upon logging in.

Sendgrid was found to have a fast delivery rate with both large and small website, however the emails are frquently spammed. Mail recepient cannot see invites unless the spam folder is accessed and this is an inconvenience for some users.

Nodemailer uses HTML content and has no dependencies which allows code to be easily auditabe. It has  OAuth2 authentication and secure email delivery using TLS/STARTTLS. The emails are receieved within  seconds and do not go to spam. It can add attachements to messages and also supports unicode.

## Decision

We have decided to use Nodemailer as a mailing system because we would like invitees to see invites in their inbox. 

## Status

Accepted

## Consequences
    * Installing Nodemailer is easy because it's a module for Node.js applications.
    * Nodemailer is a free API
    * Setting-up an alias gmail address with nodemailer is a challenge. It requires experience and skills.
