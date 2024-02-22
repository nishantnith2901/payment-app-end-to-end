
# Project Title

This project is a clone of the Paytm application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides functionalities similar to Paytm, including user authentication, wallet management, money transfer, and more.


## API Reference

#### create a new user

```http
  POST /api/vi/user/signup
```

| req body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` |  `firstName of user` |
| `lastName` | `string` |  `lastName of user` |
| `username` | `string` |  `username of user` |
| `password` | `string` |  `password of user` |

#### login to access your account

```http
  POST /api/vi/user/signin
```

| req body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` |  `username of user` |
| `password` | `string` |  `password of user` |

#### update profile

```http
  PUT /api/vi/user
```

| req body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | firstName to be updated |
| `lastName` | `string` | lastName to be updated |
| `password` | `string` | password to be updated |

#### get the users by the filter keyword in their firstName or lastName

```http
  GET /api/vi/user/bulk/${filter}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `filter`      | `string` | filter to get the matching users |

#### get the accont balance of the user
```http
  GET /api/vi/account/balance/
```
#### transfer money to a friend
```http
  POST /api/vi/account/transfer/
```
| req body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `amount` | `number` |  `amount to be sent in Rs.` |
| `to` | `string` |  `userId of friend to whom money to be send` |




## Authors

- [@SatyamChauhan](https://github.com/SatyamRana50)


## 🛠 Skills
React, NodeJs, ExpressJs, MongoDb


## Optimizations

- Performance Improvements: proper state management avoiding unnecessary rendering
- Code Splitting: Splitting large codebases into smaller, modular components can improve loading times and facilitate easier maintenance and debugging.
- Caching: Implementing caching mechanisms for frequently accessed data can reduce database queries and improve response times.
- Error Handling: Implementing robust error handling mechanisms, including proper logging and informative error messages, can improve troubleshooting and debugging.
- Security: Applying security best practices, such as input validation, parameterized queries, and implementing security headers, can help mitigate common vulnerabilities and protect against security threats


## Features

- User authentication using jwt
- Wallet Management
- Money Transfer
- Responsive design
- built totally using MongoDB, Express.js, React.js, Node.js



## Screenshots

![SignIn Page](https://github.com/SatyamRana50/paytm-clone-end-to-end/assets/100602483/e142174b-998e-4316-ba1f-fda94374c547)
![Signup Page](https://github.com/SatyamRana50/paytm-clone-end-to-end/assets/100602483/932867df-09fe-43d9-92de-920dd12855ac)
![Dashboard](https://github.com/SatyamRana50/paytm-clone-end-to-end/assets/100602483/abc3ffb2-c2c2-46fa-9e4b-ee86f72f3ee7)
![Money Transfer](https://github.com/SatyamRana50/paytm-clone-end-to-end/assets/100602483/3a640483-1163-41e0-8106-e7a58dea33ea)
![Transfer Succesful](https://github.com/SatyamRana50/paytm-clone-end-to-end/assets/100602483/23d5ef17-b4b0-4820-b166-6b99de3acd0e)
![Low balance](https://github.com/SatyamRana50/paytm-clone-end-to-end/assets/100602483/8cd233a9-3104-447f-8afd-d098bf169170)




