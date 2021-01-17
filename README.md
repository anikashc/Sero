# Sero
No contact restaurant menu manager

In these unprecedented times where physical touch has started to be controversial yet something which as a habit is difficult to get rid of, we food enthusiasts or Foodies are finding it difficult to go to restaurants and order our food without physically touching the menu and selecting whatever we like. Applications exist which are driven by the much profit making businesses of delivery but don’t have much to offer to address this problem of no contact dining menu services. Our solution is inspired by this problem statement and we present the no contact menu manager. Let's look at the features of the application.

User Panel
User scans a QR code on their table and enter a table number (if applicable)
The catalogue of food offered by the respective dining service shows up. 
The user can select items and their quantity and add them to their cart.
After adding to their cart, the user can see the price breakup and the final amount which needs to be paid. 
The user can get regular updates about their food preparation process.
The user can add any discount coupon offered by the restaurant and save some money as well. 
The final steps are payment gateway which gives the user two choices (condition to the restaurant) “Pay Now” or “Pay after Dining”.

Restaurant Panel
The restaurant manager allows the restaurant to manage all their bookings, coupons, status tracking etc. 


Screens.
User:
Use React Router Dom for all this.
Home Screen : %/ 
Will include a search field in the middle
Scroll to see restaurants and their menus. (Here we can add pagination from the video)

Restaurant Search: %/menu?search=SmokeDeli

Clicking on the item will take to: %/menu?placeId=2143243

After QR scan page %/qr?search=SmokeDeli

After entering table number: %/menu?placeId=2143243&tableNumber=14

After clicking on Cart: %/cart?tableNumber=14
    
As soon as you click on Pay Now and Place Order it places order first and then payment is to be done or we’ll see.

Needs to be checked from the database whether this is set to true or not

After clicking “Pay Now and Place Order”: %/payment?orderId=3234234 (Payments can be the same as the video etc)
    
After Clicking “Pay Later and Place Order” : %/temporarySuccess?orderId=3234235&tableNumber=14

Make a URL shortner (one more functionality yay!)

This URL will be sent to the users phone/mail whatever we can get our hands on.

It will redirect to the payments page and the user will complete the payment. (From the video again)

Enough for users.
Will add login functionality later for users. Login for restaurants is important first.



Will have to see the structure of db

Restaurant Login:
Login: login functionality 
********************************************************************************************************
Git commands to keep in mind-----
Git commands for pushing changes to your branch
1. git add app.js app1.js (only add files which have changed)
2. git status (to check what all have been changed)
3. git commit -m "Made changes in app structure"
Add a good comment
4. git remote -v
check if remote is connected (else add)
5. git checkout amrit
6. git push -u origin amrit

To update your local git repository with the master (if required)
1. git pull --no-commit https://github.com/anikashc/Sero.git
2. git push -u origin amrit
