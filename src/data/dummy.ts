import { ChatState, Message, Room } from "@/types/system/slice";

const user1 = {
  _id: "u1",
  name: "Alice",
  role: "admin",
  email: " ",
  phone: "",
};
const user2 = { _id: "u2", name: "Bob", role: "admin", email: " ", phone: "" };
const user3 = {
  _id: "u3",
  name: "Charlie",
  role: "admin",
  email: " ",
  phone: "",
};
const user4 = {
  _id: "u4",
  name: "David",
  role: "admin",
  email: " ",
  phone: "",
};
const user5 = { _id: "u5", name: "Eve", role: "admin", email: " ", phone: "" };

// Dummy messages
const messages: Message[] = [
  {
    _id: "m1",
    roomId: "r1",
    senderId: "u1",
    from: user1,
    text: "Hey Bob, how are you?",
    attachments: [],
    to: ["u2"],
    createdAt: new Date().toISOString(),
    readBy: ["u1"],
  },
  {
    _id: "m2",
    roomId: "r1",
    senderId: "u2",
    from: user2,
    text: "Hi Alice! I'm good. How about you?",
    attachments: [],
    to: ["u1"],
    createdAt: new Date().toISOString(),
    readBy: ["u2"],
  },

  {
    _id: "m3",
    roomId: "r2",
    senderId: "u3",
    from: user3,
    text: "Hello everyone in the group chat!",
    attachments: [],
    to: ["u1", "u2"],
    createdAt: new Date().toISOString(),
    readBy: ["u3"],
  },
  {
    _id: "m4",
    roomId: "r2",
    senderId: "u1",
    from: user1,
    text: "Hi Charlie!",
    attachments: [],
    to: ["u2", "u3"],
    createdAt: new Date().toISOString(),
    readBy: ["u1"],
  },

  {
    _id: "m5",
    roomId: "r3",
    senderId: "u4",
    from: user4,
    text: "David here, hello Eve!",
    attachments: [],
    to: ["u5"],
    createdAt: new Date().toISOString(),
    readBy: ["u4"],
  },
  {
    _id: "m6",
    roomId: "r3",
    senderId: "u5",
    from: user5,
    text: "Hey David!",
    attachments: [],
    to: ["u4"],
    createdAt: new Date().toISOString(),
    readBy: ["u5"],
  },

  {
    _id: "m7",
    roomId: "r4",
    senderId: "u2",
    from: user2,
    text: "Bob checking in solo room",
    attachments: [],
    to: ["u2"],
    createdAt: new Date().toISOString(),
    readBy: ["u2"],
  },

  {
    _id: "m8",
    roomId: "r5",
    senderId: "u3",
    from: user3,
    text: "Group 2 chat starts",
    attachments: [],
    to: ["u1", "u4", "u5"],
    createdAt: new Date().toISOString(),
    readBy: ["u3"],
  },
];

// Dummy rooms
const rooms: Room[] = [
  {
    _id: "r1",
    name: "Alice & Bob",
    users: ["u1", "u2"],
    lastMessage: messages[1],
  },
  {
    _id: "r2",
    name: "Group Chat 1",
    users: ["u1", "u2", "u3"],
    lastMessage: messages[3],
  },
  {
    _id: "r3",
    name: "David & Eve",
    users: ["u4", "u5"],
    lastMessage: messages[5],
  },
  { _id: "r4", name: "Bob Solo Room", users: ["u2"], lastMessage: messages[6] },
  {
    _id: "r5",
    name: "Group Chat 2",
    users: ["u1", "u3", "u4", "u5"],
    lastMessage: messages[7],
  },
];
