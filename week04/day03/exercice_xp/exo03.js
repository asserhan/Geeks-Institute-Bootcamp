const users = { user1: 18273, user2: 92833, user3: 90315 }
const userArray=Object.entries(users);
console.log(userArray);

const modifyUsers = userArray.map(([user, id]) => [user, id * 2]);
console.log(modifyUsers);