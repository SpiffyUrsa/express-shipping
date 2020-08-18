"use strict";

const SHIPIT_SHIP_URL = "http://localhost:3001/ship";

const axios = require("axios");


/** Ship a single product through the shipit API.
 *
 * Returns shipId from shipit.
 */

async function shipProduct({ productId, name, addr, zip }) {
  const resp = await axios({
    method: "POST",
    url: SHIPIT_SHIP_URL,
    data: {
      itemId: productId, name, addr, zip,
    },
  });

  return resp.data.receipt.shipId;
}

module.exports = { shipProduct };
