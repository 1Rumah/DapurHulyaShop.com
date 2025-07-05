

const midtransClient = require('midtrans-client');
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'Mid-server-Ta7LJ6o49ogZV6sRLk4zibe6'
});

app.post('/create-transaction', async (req, res) => {
  const { buyer, items, total } = req.body;
  const orderId = 'ORDER-' + Date.now();

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: total
    },
    customer_details: {
      first_name: buyer.name,
      email: 'test@example.com',
      phone: buyer.phone,
      billing_address: {
        first_name: buyer.name,
        address: buyer.address
      }
    },
    item_details: items.map(i => ({
      id: i.name,
      price: i.price,
      quantity: i.qty,
      name: i.name
    }))
  };

  const transaction = await snap.createTransaction(parameter);
  res.json({ token: transaction.token });
});
