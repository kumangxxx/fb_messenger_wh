# FB Messenger Webhook

This is a mini project to proof that facebook messages can be handled by our server. Every person that send message to this [page](https://www.facebook.com/PadConcert-313860545763191) will be saved in our db, and then we can send them messages.

# INSTALLATION
```
git clone https://github.com/kumangxxx/fb_messenger_wh.git
```

# HOW TO USE
1. Setup your .env
    ```
    mongodb=mongodb://user:password@host:27017/db_name
    facebook_access_token=some-access-token
    LOCAL_TOKEN=some-token
    port=4000
    ```
2. Run the service
    ```
    node index.js
    ```
3. Open the dashboard in /page/dashbboard
# API
#### Send Message
```
curl -X POST \
  http://host:4000/api/send \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 2d914898-366e-c81e-8d2a-97410161a828' \
  -d '{
	"message": "some-message-or-url",
	"is_image": false,
	"people" : [ "some-person-id" ]
}'
```

# Note
This project is still in development mode, so not every message will be handled, only messages from testers or developers will be handled.

# Contributor / Contact
- Rahadian Ahmad (kumangxxx@gmail.com)

# How to Contribute
1. Make a pull request / merge request
