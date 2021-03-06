# server


## used libraries

- express
- cors
- morgan
- dotenv
- mongoose
- bcrypt
- jsonwebtoken

---
## Models

* user model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| name       | String          | required         | n/a           |
| userNsme   | String          | required, unique | n/a           |
| email      | String          | required, unique | n/a           |
| avatar     | String          | required         | n/a           |
| password   | String          | required         | n/a           |
| isDeleted  | Boolean         | required         | n/a           |
| roles      | Schema <roles>  | required         | n/a           |

---
 
* product Model 
 
| key           | type                        | options          | default value |
| ----------    | ---------------             | ---------------- | ------------- |
| typeOfProduct | Schema <typeOfProduct>      | required,required| n/a           |
| name          | String                      | required         | n/a           |
| image         | String                      | required         | n/a           |
| comment       | Schema <comment>            | required         | n/a           |
| description   | String                      | required         | n/a           |
| creator       | String                      | required         | n/a           |
| size          | Number                      | required         | n/a           |
| price         | Number                      | required         | n/a           |
| isDeleted     | Boolean                     | required         | n/a           |
| isLiked       | Schema <Like>               | required         | n/a           |
| category      | Schema <category>           | required         | n/a           |
| pool          | String                      | required         | n/a           |
| duration      | String                      | required         | n/a           |
| currentWinner | String                      | required         | n/a           |
| status        | String                      | required         | n/a           |
| StarrtingDate | Date                        | required         | n/a           |
| currentBit    | Number                      | required         | n/a           |

 
 ---
 
 * roles model

| key       | type   | options          | default value |
| ----      | ------ | ---------------- | ------------- |
| role      | String | required, unique | n/a           |
| permition | Array  | required, unique | n/a           |

 ---
 
 * comment model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| comment     | String          | required | n/a           |
| userNsme    | Schema <user>   | required | n/a           |
| product     | Schema <product>| required | n/a           |
| isDeleted   | Boolean         | n/a      | false         |

 ---
 
 * Like model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| isLiked     | Boolean         | required | n/a           |
| user        | Schema <user>   | required | n/a           |
| product     | Schema <product>| required | n/a           |

---
 
 * Message model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| Message     | String          | required | n/a           |
| userName    | Schema <user>   | required | n/a           |
| isDeleted   | Boolean         | required | n/a           |
| Date        | Date            | required | n/a           |
 
 
 ---
 
 * Room model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| product     | Schema <product>| required | n/a           |
| message     | Schema <Message>| required | n/a           |
| user        | Schema <user>   | required | n/a           |

 ---
 
 * typeOfProduct model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| name        | String          | required | n/a           |
| product     | Schema <product>| required | n/a           |

 ---
 
 
 * status model
 
| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| Status      | String          | required | n/a           |
| product     | Schema <product>| required | n/a           |

 ----
 
 * Category model
 
| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| category    | String          | required | n/a           |
| product     | Schema <product>| required | n/a           |
 
 ---
 
## ER Diagram
 
 ![newSchema](https://user-images.githubusercontent.com/92248111/147153464-a8f28986-b1d5-4371-aa22-9ea6aa961003.jpeg)



---
 
## Routes

- User routes
  | HTTP Method | URL | Permissions | Request Body | Success status | Error Status | Description |
  | ----------- | ----- | --------------------------- | ------------------------------- | -------------- | ------------ | --------------------------------------------------------------- |
  | POST | `/users` | Public | n/a | 201 | 401 | create new user |
  | POST | `/register` | Public | {name , userName , email , password} | 201 | 401 | create new user |
  | post | `/logIn` | Public | { email, password } | 200 | 400, 404 | check if user is exists then return token with user information |
  | POST | `/user/:id` |Public | n/a | 200 | 400 | verifying user account |
  
----
 
 * Role routes
 
  | HTTP Method | URL          | Permissions                     | Request Body             | Success status | Error Status | Description.    |
  | ----------- | ------------ | ------------------------------- | -------------------------| -------------- |--------------| ----------------|
  | POST        |`/createRole` |`Authentication & Authorization` |{role, permissions}.      | 201            |          400 | create new role |
  | GET         | `/getRole`   |`Authentication & Authorization` |{name,email,password,role}| 200            |           400| show all role in the database |

 
 --- 
 
  * product routes
 
  | HTTP Method | URL | Permissions | Request Body | Success status | Error Status | Description |
  | ----------- | ----- | --------------------------- | ------------------------------- | -------------- | ------------ | -----------------------------------------
  | GET         |`/allproducts`| Public | n/a | 200 | 400 | get all courses |
  | POST                        | `/createProduct` | Private `Authorization` | { typeOfProduct ,name,image,description,creator,size,price,user,status ,isDeleted,category,startingBid,pool,duration,current winner,status,startingDate,currentBid} | 201 | 400 | create a new Products |
  | GET | `/getOneProduct/:id` | Public | n/a | 200 | 400 | get Products by id |
  | delete | `/deleteProduct/:id` | private`Authorization` | n/a | 200 | 400 | get courses by category |
  | put | `/updateOnProduct` | private`Authorization` | n/a | 200 | 400 | get update on Product |
  
 ---
 
 * Comments routes
 
  | HTTP Method | URL            | Permissions                 | Request Body | Success status | Error Status | Description          |
  | ----------- | -------------  | --------------------------- | ------------ | -------------- | ------------ | ---------------------| 
  | GET         |`/:commentId`   | Private `Authentication`    | n/a          | 200            | 400          | get comment by id    |
  | post        |`/createComment`| public `Authentication`.    | n/a          | 200            | 400          | create comment       |
 
 ---
 
 
## UML Diagram
![UML-BackEnd drawio](https://user-images.githubusercontent.com/92248111/146668984-1aa9256e-4ad0-4586-aacd-c733d7400832.png)

---
 
 ## Links 
 * [Client repository Link](https://github.com/MP-Project-Meead/client)
 * [Server repository Link](https://github.com/MP-Project-Meead/server)
 * [Deployed App Link](https://luxury-project.herokuapp.com
)
 * [terllo Link](https://trello.com/b/gawVOASv/mp-porject)

