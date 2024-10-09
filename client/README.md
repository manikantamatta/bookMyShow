## BookMyShow Client

### Overview

The BookMyShow Client is the frontend component of the BookMyShow application. It is built using Angular and provides a user interface for functionalities such as user authentication, movie search, booking seats, and more.

### File Structure
```
└── 📁BookMyShowClient
    └── 📁src
        └── 📁app
            └── 📁components
                └── 📁auth
                    └── 📁login
                        └── login.component.html
                        └── login.component.scss
                        └── login.component.spec.ts
                        └── login.component.ts
                    └── 📁register
                        └── register.component.html
                        └── register.component.scss
                        └── register.component.spec.ts
                        └── register.component.ts
                    └── auth.component.html
                    └── auth.component.scss
                    └── auth.component.spec.ts
                    └── auth.component.ts
                └── 📁banner
                    └── 📁search
                        └── search.component.html
                        └── search.component.scss
                        └── search.component.spec.ts
                        └── search.component.ts
                    └── banner.component.html
                    └── banner.component.scss
                    └── banner.component.spec.ts
                    └── banner.component.ts
                └── 📁content
                    └── 📁admin
                        └── admin.component.html
                        └── admin.component.scss
                        └── admin.component.spec.ts
                        └── admin.component.ts
                    └── 📁events
                        └── 📁book-tickets
                            └── book-tickets.component.html
                            └── book-tickets.component.scss
                            └── book-tickets.component.spec.ts
                            └── book-tickets.component.ts
                        └── 📁event-details
                            └── event-details.component.html
                            └── event-details.component.scss
                            └── event-details.component.spec.ts
                            └── event-details.component.ts
                        └── 📁payment-gateway-event
                            └── payment-gateway-event.component.html
                            └── payment-gateway-event.component.scss
                            └── payment-gateway-event.component.spec.ts
                            └── payment-gateway-event.component.ts
                        └── event.module.ts
                        └── events.component.html
                        └── events.component.scss
                        └── events.component.spec.ts
                        └── events.component.ts
                    └── 📁home
                        └── home.component.html
                        └── home.component.scss
                        └── home.component.spec.ts
                        └── home.component.ts
                    └── 📁list-your-show
                        └── 📁list-cinema
                            └── list-cinema.component.html
                            └── list-cinema.component.scss
                            └── list-cinema.component.spec.ts
                            └── list-cinema.component.ts
                        └── 📁list-events
                            └── list-events.component.html
                            └── list-events.component.scss
                            └── list-events.component.spec.ts
                            └── list-events.component.ts
                        └── 📁list-movie
                            └── list-movie.component.html
                            └── list-movie.component.scss
                            └── list-movie.component.spec.ts
                            └── list-movie.component.ts
                        └── 📁list-shows
                            └── list-shows.component.html
                            └── list-shows.component.scss
                            └── list-shows.component.spec.ts
                            └── list-shows.component.ts
                        └── 📁main-page
                            └── main-page.component.html
                            └── main-page.component.scss
                            └── main-page.component.spec.ts
                            └── main-page.component.ts
                        └── 📁update-movie
                            └── update-movie.component.html
                            └── update-movie.component.scss
                            └── update-movie.component.spec.ts
                            └── update-movie.component.ts
                        └── list-your-show.component.html
                        └── list-your-show.component.scss
                        └── list-your-show.component.spec.ts
                        └── list-your-show.component.ts
                        └── list-your-show.module.ts
                    └── 📁movies
                        └── 📁book-seats
                            └── book-seats.component.html
                            └── book-seats.component.scss
                            └── book-seats.component.spec.ts
                            └── book-seats.component.ts
                        └── 📁browse-by-cinema
                            └── 📁buy-tickets
                                └── buy-tickets.component.html
                                └── buy-tickets.component.scss
                                └── buy-tickets.component.spec.ts
                                └── buy-tickets.component.ts
                            └── browse-by-cinema.component.html
                            └── browse-by-cinema.component.scss
                            └── browse-by-cinema.component.spec.ts
                            └── browse-by-cinema.component.ts
                        └── 📁dialog
                            └── 📁select-format
                                └── select-format.component.html
                                └── select-format.component.scss
                                └── select-format.component.spec.ts
                                └── select-format.component.ts
                            └── 📁select-seats-number
                                └── select-seats-number.component.html
                                └── select-seats-number.component.scss
                                └── select-seats-number.component.spec.ts
                                └── select-seats-number.component.ts
                            └── 📁warning-dialog
                                └── warning-dialog.component.html
                                └── warning-dialog.component.scss
                                └── warning-dialog.component.spec.ts
                                └── warning-dialog.component.ts
                        └── 📁movie-details
                            └── movie-details.component.html
                            └── movie-details.component.scss
                            └── movie-details.component.spec.ts
                            └── movie-details.component.ts
                        └── 📁payment-gateway
                            └── payment-gateway.component.html
                            └── payment-gateway.component.scss
                            └── payment-gateway.component.spec.ts
                            └── payment-gateway.component.ts
                        └── 📁shows
                            └── shows.component.html
                            └── shows.component.scss
                            └── shows.component.spec.ts
                            └── shows.component.ts
                        └── movie.module.ts
                        └── movies.component.html
                        └── movies.component.scss
                        └── movies.component.spec.ts
                        └── movies.component.ts
                    └── content.component.html
                    └── content.component.scss
                    └── content.component.spec.ts
                    └── content.component.ts
                └── 📁footer
                    └── footer.component.html
                    └── footer.component.scss
                    └── footer.component.spec.ts
                    └── footer.component.ts
                └── 📁page-not-found
                    └── page-not-found.component.html
                    └── page-not-found.component.scss
                    └── page-not-found.component.spec.ts
                    └── page-not-found.component.ts
                └── 📁shared
                    └── 📁location
                        └── location.component.html
                        └── location.component.scss
                        └── location.component.spec.ts
                        └── location.component.ts
                    └── 📁rating-dialog
                        └── rating-dialog.component.html
                        └── rating-dialog.component.scss
                        └── rating-dialog.component.spec.ts
                        └── rating-dialog.component.ts
                └── 📁user
                    └── 📁user-bookings
                        └── user-bookings.component.html
                        └── user-bookings.component.scss
                        └── user-bookings.component.spec.ts
                        └── user-bookings.component.ts
                    └── 📁user-profile
                        └── user-profile.component.html
                        └── user-profile.component.scss
                        └── user-profile.component.spec.ts
                        └── user-profile.component.ts
            └── 📁constants
                └── filters.ts
                └── food_service.ts
            └── 📁guard
                └── admin.guard.spec.ts
                └── admin.guard.ts
            └── 📁interceptor
                └── auth.interceptor.ts
                └── http-interceptor.interceptor.spec.ts
            └── 📁models
                └── auth.ts
                └── booking.ts
                └── cinema.ts
                └── error.ts
                └── event.ts
                └── interfaces.ts
                └── movie.ts
                └── payment.ts
                └── review.ts
                └── show.ts
                └── unifiedShows.ts
                └── user.ts
            └── 📁pipes
                └── split.pipe.spec.ts
                └── split.pipe.ts
            └── 📁services
                └── 📁auth
                    └── auth.service.spec.ts
                    └── auth.service.ts
                └── 📁booking
                    └── booking.service.spec.ts
                    └── booking.service.ts
                └── 📁business
                    └── business.service.spec.ts
                    └── business.service.ts
                └── 📁cinema
                    └── cinema.service.spec.ts
                    └── cinema.service.ts
                └── 📁event
                    └── event.service.spec.ts
                    └── event.service.ts
                └── 📁movie
                    └── movie.service.spec.ts
                    └── movie.service.ts
                └── 📁rating
                    └── rating.service.spec.ts
                    └── rating.service.ts
                └── 📁search
                    └── search.service.spec.ts
                    └── search.service.ts
                └── 📁show
                    └── show.service.spec.ts
                    └── show.service.ts
                └── 📁trending
                    └── trending.service.spec.ts
                    └── trending.service.ts
                └── 📁user
                    └── user.service.spec.ts
                    └── user.service.ts
                └── 📁utils
                    └── utils.ts
            └── 📁sharedservice
                └── auth-service.service.spec.ts
                └── auth-service.service.ts
                └── location.service.spec.ts
                └── location.service.ts
                └── movie-data.service.spec.ts
                └── movie-data.service.ts
                └── toaster.service.spec.ts
                └── toaster.service.ts
            └── 📁utils
                └── util.ts
            └── app-routing.module.ts
            └── app.component.html
            └── app.component.scss
            └── app.component.spec.ts
            └── app.component.ts
            └── app.module.ts
            └── shared.module.ts
        └── 📁assets
            └── 📁Caraosal
                └── bg-movie.jpg
                └── carousel-day.jpg
                └── images.jpeg
                └── sampleImage.jpg
                └── sampleImage2.jpg
            └── 📁images
                └── bicycle-svgrepo-com.svg
                └── booking.png
                └── bookmyshow-logo-vector.svg
                └── bus-svgrepo-com.svg
                └── car-svgrepo-com.svg
                └── down-arrow-4-svgrepo-com.svg
                └── Foodcombo.jpeg
                └── magnifying-glass-solid.svg
                └── pepsi.jpeg
                └── popcorn.jpeg
                └── sample_movie_poster.jpeg
                └── sample_seat_info.png
                └── sample_wide_poster.png
                └── subscribe.png
                └── support.png
            └── .gitkeep
        └── 📁environments
            └── environment.prod.ts
            └── environment.ts
        └── favicon.ico
        └── index.html
        └── main.ts
        └── polyfills.ts
        └── styles.scss
        └── test.ts
    └── .browserslistrc
    └── .editorconfig
    └── .gitignore
    └── angular.json
    └── karma.conf.js
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.spec.json
```
### Flow Explanation

#### 1. Components
Components are the building blocks of the Angular application. Each component consists of an HTML template, a CSS/SCSS file for styling, a TypeScript file for logic, and a spec file for unit tests. Components are organized into feature-specific directories.

#### 2. Services
Services are used to share data and functionality across components. They are typically used for making HTTP requests to the backend server, managing state, and encapsulating business logic.

##### Shared Services
There are common shared services for handling location, userId, and businessId. These services are used across various components and modules to maintain consistency and reduce code duplication.

#### 3. Modules
Modules are used to organize the application into cohesive blocks of functionality. Each module can contain components, services, and other modules. The root module, `AppModule`, bootstraps the application.

#### 4. Routing
Routing is used to navigate between different views or components in the application. The Angular Router module is configured to define routes and their corresponding components.

##### Route Guards
Routes are protected using guards to ensure that only authenticated users can access certain endpoints. This is implemented using Angular's `CanActivate` interface, which checks for valid authentication tokens before allowing access to protected routes.

#### 5. Lazy Loading
Lazy loading is implemented to improve the performance of the application by loading modules only when they are needed. This reduces the initial load time and improves the user experience.

### Environment Variables
The application uses environment variables for configuration. These variables are defined in the `environment.ts` and `environment.prod.ts` files.

### Getting Started

#### Prerequisites
- Node.js
- npm (Node Package Manager)
- Angular CLI

#### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/BookMyShowClient.git
    cd BookMyShowClient
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the development server:**
    ```sh
    ng serve
    ```

4. **Build for production:**
    ```sh
    ng build --prod
    ```

### Deployment
To deploy the client application, you can use various hosting services such as Firebase Hosting, AWS S3, Netlify, or Vercel. Follow the hosting service's instructions to deploy the built application.

