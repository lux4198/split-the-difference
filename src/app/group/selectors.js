const getMemberByID = (members, id) => {
  if (!members || !id) return null;
  return members.find((member) => member.id == id);
};

export { getMemberByID };
