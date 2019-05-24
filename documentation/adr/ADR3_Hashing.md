# ADR3: Hashing Passwords with bcrypt over Octopus Deploy

It is important that a password of  a user be encrypted  before it is stored in the data base for security purposes. This is to ensure that if someone hacks the database they only get hashes of passwords which are irreversable. It also gives the user a sense of privacy because only the user will know their password

Bcrypt is a hashing technique specifically designed for password hashing hence it is slow. Faster hashing algotithms means  faster brute-force attacks. Bcrypt is a slow algorithm because it uses salt to further encrypt the password which makes the hash unique and makes it impossible for attackers to decrypt. It is protected against rainbow table attacks and is resistant to brute-force search attacks. One disadvantages with this technique is that it has a maximum password length which ranges from 50-72 bytes.

Octopus deploy is an encrypted password harshing technique. Before using this harshing technique, one needs to create an octopus account and only after that an API key can be generated. It also associated with a maximum security which makes it difficult for ones account to be hacked.

## Decision

We have decided to use bcrypt for hashing password since it does not require an API key for set-up.

## Status

Accepted

## Consequences

    * Does not need any API key for configuration, it's easy to use and to generate salts.
    * Does not require one to learn what the functions do.
    * Bcrypt makes use of cryptographic function to calclate hashes. However, the these computations are executed fast which raises a significant bearing on how safe the password is.






