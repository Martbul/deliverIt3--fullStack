const router = require("express").Router();
const orderService = require("../services/orderService");


router.post("/order", async (req, res) => {
  try {
    const { fullname, order, address, dayForDelivery, timeForDelivery } =
      req.body;
    // console.log(req.body);

    await orderService.create({
      fullname,
      order,
      address,
      dayForDelivery,
      timeForDelivery,
    });
      res.status(201).end();
  } catch (message) {
    res.status(400).json({ message });
  }
  
});

router.get("/details/:orderId", async (req, res) => {
  const orderId = req.params;

  const order = await orderService.getSingleOrder(orderId).lean();

  if (!order) {
    res.redirect("/404");
    return;
  }

  res.render("details");
});

module.exports = router;
