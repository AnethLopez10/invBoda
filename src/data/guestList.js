export const guestStats = {
  familiares: 88,
  amigos: 61,
  total: 149,
};

export function formatSheetLabel(guest) {
  return guest.count > 1 ? `${guest.name} (${guest.count})` : guest.name;
}

export const guestFamilies = [
  { name: 'Familia Hernandez Martinez (abuelos)', count: 4 },
  { name: 'Familia Hernandez Martinez', count: 3 },
  { name: 'Familia Ramirez Montenegro', count: 3 },
  { name: 'Familia López Hernandez', count: 3 },
  { name: 'Familia Palomo Hernandez', count: 3 },
  { name: 'Familia Hernandez Lozoya', count: 2 },
  { name: 'Familia Lozoya Lozoya', count: 5 },
  { name: 'Familia Hernandez Hernandez', count: 3 },
  { name: 'Familia Muñiz Hernandez', count: 5 },
  { name: 'Familia Montenegro Martinez', count: 4 },
  { name: 'Familia Ruiz Martinez', count: 3 },
  { name: 'Familia Ruiz Martinez', count: 2 },
  { name: 'Familia Lopez Montenegro', count: 2 },
  { name: 'Familia Canizales Ramos', count: 2 },
  { name: 'Familia Lopez Cerda', count: 5 },
  { name: 'Familia Becerra Lopez', count: 2 },
  { name: 'Familia Ramos Cerda', count: 2 },
  { name: 'Familia Ramos Guerrero', count: 3 },
  { name: 'Familia Estrada Ramos', count: 7 },
  { name: 'Familia Galicia Ramos', count: 6 },
  { name: 'Familia Cerda Garcia', count: 4 },
  { name: 'Familia Cerda Cadena', count: 2 },
  { name: 'Familia Lopez Zapata', count: 3 },
  { name: 'Familia Lopez Donjuan', count: 4 },
  { name: 'Familia Castro Rodriguez', count: 2 },
  { name: 'Familia Mendoza Larrea', count: 2 },
  { name: 'Gricelda Cerda', count: 2 },
];

export const guestFriends = [
  { name: 'Celina Aguilar', count: 2 },
  { name: 'Ana Paula Rodriguez', count: 2 },
  { name: 'Valeria Juache', count: 2 },
  { name: 'Joseph Rodriguez', count: 2 },
  { name: 'Cesar Vazquez', count: 2 },
  { name: 'Emiliano Castillo', count: 2 },
  { name: 'Brayan Arredondo', count: 2 },
  { name: 'Juan Manuel Delgado', count: 2 },
  { name: 'Sebastian Farias', count: 2 },
  { name: 'Sixto Banda', count: 2 },
  { name: 'Hugo Gonzalez', count: 2 },
  { name: 'Alfredo Lemoine', count: 2 },
  { name: 'Daniel Hernandez', count: 2 },
  { name: 'Arturo Mena', count: 2 },
  { name: 'Javier Gutierrez', count: 2 },
  { name: 'Sergio Cruz', count: 2 },
  { name: 'Rogelio Cruz', count: 2 },
  { name: 'Javier Ramirez', count: 2 },
  { name: 'Raul Cisneros', count: 2 },
  { name: 'Livierh Guillen', count: 2 },
  { name: 'Sarahi Chavez', count: 2 },
  { name: 'Harel Ruelas', count: 2 },
  { name: 'Isela Rivera', count: 2 },
  { name: 'Diego Guzman', count: 2 },
  { name: 'Antonio Zavala', count: 1 },
  { name: 'Alexis Giovani', count: 1 },
  { name: 'Omar Salazar', count: 1 },
  { name: 'Irving Cruz', count: 1 },
  { name: 'Gilberto Rosales', count: 1 },
  { name: 'Luis Montero', count: 1 },
  { name: 'Axacatl Rafael', count: 1 },
  { name: 'Gerardo Ramos', count: 1 },
  { name: 'Jaime Hernandez', count: 1 },
  { name: 'Jair Palacio', count: 1 },
  { name: 'Elizabeth Hernandez', count: 1 },
  { name: 'Judith Morales', count: 1 },
  { name: 'Patricia Ortiz', count: 1 },
];

export const allGuests = [
  ...guestFamilies.map((g) => ({ ...g, category: 'Familiar' })),
  ...guestFriends.map((g) => ({ ...g, category: 'Amigo' })),
];

export const guestSearchOptions = allGuests.map((guest, id) => ({
  id,
  label: guest.name,
  sheetLabel: formatSheetLabel(guest),
  count: guest.count,
  category: guest.category,
  searchText: guest.name.toLowerCase(),
}));
