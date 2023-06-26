# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


![image](https://github.com/arijitmandal10/contact-list-app/assets/114182784/312f3d1c-eaec-489f-8b30-3ab992243779)

### Body component explaination

The `handleCreateUser` function is an asynchronous function that is triggered when the form for creating or updating a user is submitted. It performs the necessary operations based on whether the form is in edit mode or create mode.

Here's an explanation of the function:

1. The function is defined using the `async` keyword, which allows the use of `await` inside the function to handle promises.
2. The function takes an event (`e`) as an argument, which represents the form submission event.
3. The first line of the function, `e.preventDefault();`, prevents the default form submission behavior, which would cause a page reload.
4. Inside a `try` block, the function checks the value of the `editMode` state. If `editMode` is `true`, it performs an update operation.
5. For an update operation, it sends a PUT request to the API endpoint (`https://jsonplaceholder.typicode.com/posts/${editUser.id}`) with the updated user data in the request body.
6. The request includes the user ID, name, email, city, and phone in the JSON format. The `Content-type` header is set to indicate that the request body is JSON.
7. If the response is not `ok` (indicating a failed request), an error is thrown.
8. If the update operation is successful, the response is parsed as JSON to obtain the updated user data.
9. The `setContact` function is called with a callback that maps over the previous contact list (`prevContact`) and updates the user with the matching `id` with the updated user data (`updatedUser`).
10. The `setNewUser` function is called to reset the form inputs to empty values.
11. The `setEditMode` function is called to set `editMode` to `false`, indicating that the form is no longer in edit mode.
12. The `setEditUser` function is called with `null` to clear the `editUser` state.
13. A success toast message is displayed using the `toast.success` function to notify the user that the user was updated successfully.
14. If the `editMode` is `false`, indicating a create operation, the
