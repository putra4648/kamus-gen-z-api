import { client } from "../../database.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default async function createKamus(req, res, next) {
  try {
    /**
     * @typedef CreateKamus
     * @type {object}
     * @property {string} word
     * @property {string} wordDescription
     */

    /** @type {CreateKamus} */

    const { word, wordDescription } = req.body;

    console.log(word, wordDescription);

    if (!word || !wordDescription) {
      return res.status(400).json({
        status: "ERROR",
        data: [],
        message: "word atau description tidak boleh kosong",
      });
    }

    const kamus = await client.words.create({
      data: {
        word,
        wordDescription,
      },
    });

    return res.status(201).json({
      status: "CREATED",
      data: kamus,
      message: "Kamus berhasil dibuat",
    });
  } catch (error) {
    next(error);
  }
}
