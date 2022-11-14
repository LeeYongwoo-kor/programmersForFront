const API_END_POINT = "http://localhost:3000/api/cats";

const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ""}`);

    if (!res.ok) {
      throw new Error("Server Error!");
    }

    return await res.json();
  } catch (e) {
    throw new Error(`Something Wrong! ${e.message}`);
  }
};
