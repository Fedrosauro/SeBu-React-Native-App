<h1>¡Sebu!</h1>

¡SeBu! is a React Native marketplace application designed to help users list, browse, and favorite items for sale. The app features a clean and user-friendly interface, allowing for seamless navigation and interaction.

## Features

- **Home Screen** : The Home screen allows users to browse items available for sale. Users can search for specific items using the search bar. Items cannot be purchase directly in the application but a customer can
  contact the owner of the object to buy the object

- **My Items** : The My Items screen displays the items listed by the user, including details like the item name, description, price, and location.

- **Favorites** : The Favorites screen shows items that the user has marked as favorite for quick access.

- **New Item** : The New Item screen provides a form where users can input the name, description, price, and location of the item they wish to sell. Users can also **upload images** of the item. Or even **take photos** of the item!

- **Profile** : The Profile screen allows users to update their personal information such as name, surname, email, and password. Users can also change their profile picture.

- **Authentication** : The Authentication screen provides options for users to sign in or register for an account.

## Data Persistence and Personalization

¡SeBu! utilizes ```AsyncStorage``` to provide a persistent storage solution for user data. This ensures that information like favorites, login credentials, and potentially even user preferences are preserved across app sessions. This enhances the user experience by allowing them to pick up where 
they left off and personalize the app to their liking. AsyncStorage has been also used to save the items.

## Enhanced User Experience:
- **Favorite Items** : Users can mark items as favorites for quick and easy access later. These selections are persisted using AsyncStorage, making your favorites readily available even after restarting the app.
- **Photo Selection and Camera Access** : ¡SeBu! empowers users to choose photos for their listings or profile pictures from their device's storage. Additionally, the app provides the option to capture a new photo directly using the device's camera, offering more flexibility in how users present their items and themselves.

## Screenshot

<p align="center">
  <img src="https://github.com/Fedrosauro/SeBu-React-Native-App/assets/67149530/d9ff830c-3d60-492a-8cf7-3cf0354e99a1">
</p>



## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Fedrosauro/SeBu-React-Native-App.git
   ```

2. Open the folder in VS Code
3. Install dependencies:

    ```bash
      npm install
      ```
4. Run the application:

    ```bash
      npx expo start
      ```
5. Enjoy