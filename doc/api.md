##### GET /api/users
- return a list of all users

##### GET /api/users/$id
- return user with id

##### POST /api/users
- create a new user. attach data in body with json (check schema).

##### PUT /api/users/$id
- update user with id. attach data in body with json format.

##### GET /api/products
- return a list of all products.

##### POST /api/users/$userId/products
- add new product to user $userId. attach data in body with json format.

##### GET /api/users/$userId/products/$productId
- get product $productId of user $userId

##### PUT /api/users/$userId/products/$productId
- update product $productId of user $userId. attach data in body with json format.
