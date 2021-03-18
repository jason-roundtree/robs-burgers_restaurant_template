# Rob's Burgers (Restaurant Website Template)
This is a template website I'm building for restaurants and other businesses that sell foodstuffs (because how often have you seen great restaurants with terrible, archaic, unresponsive, unfriendly websites, or where their only online presence is actual pictures taken of their menu?!) The site theme is drawn from a fictional mustachio'd burger man and his family burger establishment.

## Tools
- Next.js (React)
- Styled Components
- Sanity.io CMS
- Netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/01cdcd9c-156a-42fd-8d65-09437603973b/deploy-status)](https://app.netlify.com/sites/flamboyant-spence-91bb13/deploys)

## TODOs
- add something to UI confirming order was added
- add message asking user to verify they don't want to save their order when they close OrderItemModal without saving
- A11y stuff TODOs: on modal close return focus to last focused element; test A11y on different browsers/devices (also what happens with scrolling disabled when modals become scrollable?)
- Add local storage for favorite/prior orders?
- add background art/images
- style order quantity increment/decrement
- allow Special Requests to be edited from order summary page
- Change menu IDs to menu slugs in url? 
- add fields in Sanity to allow admin sorting of menu items on order page
- add some animation (maybe to menu names, order details, order "cart")
- setup Admin dashboard where you can view past orders and metrics
