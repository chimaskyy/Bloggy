## Description
This is a blogging App API

### Table of Contents
* Installation
* Usage
* Authentication
* Endpoints
* Examples
* License

## Usage

Authentication
On signup, user gets a Bearer token for Authorization

Endpoints
```POST /auth/signup```	User signup
body: email, password, first_name, last_name
```POST /auth/login```	User login (Title and body of blog post required)
```POST /blog/post```	Create post
```GET /blog/post```	View all post
```DELETE /blog/post/:id```	Delete a post
```GET /blog/post```	View all post
```PUT /post/:id/``` Edit post by id
```PUT /post/:id/state``` Edit state of post(Daft or published)

## Examples
