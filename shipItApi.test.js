const { shipProduct } = require("./shipItApi");
const axios = require('axios')
const axiosMockAdapter = require('axios-mock-adapter')


const axiosMock = new axiosMockAdapter(axios)

//Setup: we somehow use our own app to make the calls to ShipIt's
beforeEach(function () {
  //This fakes a response to a POST request on ShipIt's /ship route
  axiosMock.onPost("http://localhost:3001/ship", {
                itemId: 1000,
                name: "Test Tester",
                addr: "100 Test St",
                zip: "12345-6789" })
    .reply(200, { receipt: {
                            productId: 1000,
                            name: "Test Tester",
                            addr: "100 Test St",
                            zip: "12345-6789",
                            shipId: 7 }
                })
})

test("shipProduct", async function () {
  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });
  expect(shipId).toEqual(7);
})