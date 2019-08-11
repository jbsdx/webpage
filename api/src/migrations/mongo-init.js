/* eslint-disable no-undef */
db.auth('admin-user', 'dk48d1JdkvnDK38zjnDK1jvkla');

db = db.getSiblingDB('webpage');

db.createUser({
  user: 'webpage-user',
  pwd: 'dkjJd8hbJdk81hCkf731',
  roles: [{ role: 'readWrite', db: 'webpage', }]
});

print('init mongodb..');
