const payload = {
  alert_id: '193336876',
  alert_name: 'subscription_cancelled',
  cancellation_effective_date: '2023-11-14',
  checkout_id: '234528641-chre4240f05aed8-3279d4c032',
  currency: 'USD',
  custom_data: '',
  email: 'rodionaaafgh@gmail.com',
  event_time: '2023-10-14 05:56:18',
  linked_subscriptions: '',
  marketing_consent: '0',
  passthrough: '{"userId":"a4250a905c1ce4b9e960c206f9533008a"}',
  quantity: '1',
  status: 'deleted',
  subscription_id: '23268010',
  subscription_plan_id: '565193',
  unit_price: '5.99',
  user_id: '10654072',
  p_signature:
    'TTnoyE8rnDGiMlMbmL//7RN5959q6yADAnd9jyTT9PEYgwl6q4xYeV9lC2Nd9UJwSefo1yMuTAbKv09ccQNfK2sJkJl1LQH0eaCPoZrAqg9m6xqKDkA7Db4TbtAdzGCS5cSpTJvOAonenmldTrdR/XsDr07uWRb1REtwqJTZyab4aMsC4hjFJo86XxOlHQa00QXwqSyENxAxBMMLTd/vbm4ojKcluo806cS2i2JKlXyOTAcSTzGu/1cKbs/d6V0i5jndQTCq0AfG20NM1a4Jn/zjjbATV6wF8LELj4bwVjKogYQk3tz4DmroFNWk8CsCK+QN+qvdGrvbwKa2KyobKJoqReZr1fLodlQIjfeMKKcDKpaOm385odLnoo3PK73DsO8TQtzkRPSvizwpHf7kgR3oAIKKN1Jip7x/aIkSb6zQCa46ah9+/DGDVkL7u5d8Z6K/jebnFi5tMGryhgTx4W/CtDha5VpaNr/XTtfQi2MMNKyOw5cKcUI59WHkLtRcD4pdKfoRy+zd/uDZySpWqf6i1MqEsPDQVfGaMkTym11TZp04TZmcBuajTce45VkYMvFE1t0iJk2OyRiKM5hnj2Mw4Vn0Jve87275MckePwNSFQKrPDb8JGRpujMWpP7zDIUHGwTdlCXfcA59zXK//rfYn0SyhozbbvQ7oWNy0x8=',
}

const test = async () => {
  const formData = new URLSearchParams(payload)
  const response = await fetch(
    'https://paddle-classic-webhooks.increaser.org',
    {
      method: 'POST',
      body: formData.toString(), // Convert the formData to a string
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the content type
      },
    },
  )

  const result = await response.text()
  console.log(result)
}

test()
