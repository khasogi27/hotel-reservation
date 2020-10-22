# Schema Many to Many

## Tabel Rooms
|    Rooms           |
| ------------------ |
| id (INT) [PK]      |
| room_type (VARCHAR)| 
| available (INT)    |
| price (INT)        |


# Tabel Bookings
|    Bookings        |
| ------------------ |
| id (INT) [PK]      |
| start_date (Date)  | 
| end_date (Date)    |
| status (VARCHAR)
| qrkey (VARCHAR)    |
| RoomId (INT) [FK]  |
| GuestId (INT) [FK] |

# Tabel Users
|     Users             |
| --------------------- |
| id (INT) [PK]         |
| first_name (VARCHAR)  | 
| last_name (VARCHAR)   |
| no_hp (INT)           |
| email (VARCHAR)       |
| role: (VARCHAR)
       |