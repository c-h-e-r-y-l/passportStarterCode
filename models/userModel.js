const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: 'admin',
},
{
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: 'user',
},
{
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: 'user',
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findGithubID: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
        return user;
    }
    return null;
  },
  addUser: (id, name) => {
    database.push({ id: id, email: null, name: name, password: null });
    const user = database[database.length-1];
    return user;
  }
};

module.exports = { database, userModel };
