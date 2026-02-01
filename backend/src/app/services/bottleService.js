export async function getBottles(token) {
  const response = await fetch("http://localhost:3000/api/bottles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erreur API");
  return response.json();
}

export async function createBottle(bottle, token) {
  const response = await fetch("http://localhost:3000/api/bottles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bottle),
  });

  if (!response.ok) throw new Error("Erreur création bouteille");
  return response.json();
}


export async function updateBottle(id, payload, token) {
  const res = await fetch(`http://localhost:3000/api/bottles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Erreur lors de la mise à jour de la bouteille : " + errorText);
  }

  return res.json();
}

export async function deleteBottle(id, token) {
  const res = await fetch(`http://localhost:3000/api/bottles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erreur suppression bouteille");
};

