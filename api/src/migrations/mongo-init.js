/* eslint-disable no-undef */
db.auth('admin-user', 'akl32kljkdg82lja892JDaf82Jv');

db = db.getSiblingDB('webpage');

db.createUser({
  user: 'webpage-user',
  pwd: 'dkjJd8hbJdk81hCkf731',
  roles: [{role: 'readWrite', db: 'webpage'}],
});

print('init mongodb..');
