import pool from '../config/db.js';

export const getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM tbl_users");
    return result.rows;
};

export const getUserByIdService = async () => {
    const result = await pool.query("SELECT * FROM tbl_users WHERE id = $1", [id]);
    return result.rows[0];
};

export const createUserService = async (name, email) => {
    const result = await pool.query("INSRT INTO tbl_users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
    return result.rows[0];
};

export const updateUserService = async (name, email, id) => {
    const result = await pool.query("UPDATE tbl_users SET name = $1, email = $2 WHERE id = $3 RTURNING *", [name, email, id]);
    return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM tbl_users WHERE id = $1 RTURNING *", [id]);
    return result.rows[0];
};