# MyAnime

MyAnime is a personal anime tracker built with React and Supabase. It is designed to help users record anime they have watched, rate and review them, organize them by genre, view history, and analyze their viewing activity through dashboards and statistics.

## Overview

This project started as a simple CRUD app and evolved into a full anime collection system with:

- Authentication
- Anime CRUD
- Image upload and poster display
- Multi-genre support
- Detail modal
- History page
- Analytics dashboard
- Leaderboard / ranking page
- Modern blue-and-white UI
- Responsive layout with reusable components

The app is centered around a logged-in user. Each user only sees and manages their own collection.

## Features

### Authentication
- Login and register forms using Supabase Auth
- Protected routes
- Logout flow
- Session-based access control

### Anime Collection CRUD
- Add anime with:
  - title
  - rating
  - review
  - watched date
  - poster image
  - multiple genres
- Edit anime
- Delete anime
- Auto-prefill edit form
- Keep image and genre state synchronized

### Media Support
- Upload posters to Supabase Storage
- Store image URL in the database
- Show preview before upload
- Clear file input after upload
- Delete old images from storage when replaced

### Genres
- Multi-select genre support
- Many-to-many relationship using:
  - `animes`
  - `genres`
  - `anime_genres`
- Genre badges in cards and detail views
- Genre-based filtering planned for later pages

### Dashboard
- Stats cards
- Anime preview cards
- Genre summary
- Analytics sections
- Monthly activity graph
- Rating distribution graph

### History
- Latest anime list
- Horizontal cards
- Clickable cards
- Detail modal

### Leaderboard
- Ranking anime by rating
- Top 3 podium-style layout
- Remaining anime in compact horizontal cards
- User-specific leaderboard only

### UI / UX
- Blue and white theme
- Rounded modern cards
- Responsive layout
- Toast notifications
- Custom confirmation modal
- Loading spinner
- Smooth hover and modal behavior

## Tech Stack

- React
- Vite
- Tailwind CSS
- Supabase
- React Router
- Recharts

## Project Structure

```txt
src/
  components/
  features/
  pages/
  services/
  utils/
  contexts/
```

## Supabase Schema

### `animes`
Main anime table.

Recommended columns:
- `id`
- `title`
- `rating`
- `review`
- `image_url`
- `watched_at`
- `created_at`
- `user_id`

### `genres`
Genre master table.

Recommended columns:
- `id`
- `name`

### `anime_genres`
Bridge table for many-to-many relationship.

Recommended columns:
- `anime_id`
- `genre_id`

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Setup

```bash
npm install
npm run dev
```

## Supabase Notes

- `created_at` is kept as database creation time.
- `watched_at` is used for viewing/analytics time.
- `watched_at` can fall back to `created_at` for legacy data.
- Storage bucket should be public for display, while upload access should still be controlled with policies.
- Row Level Security is enabled to ensure each user only accesses their own data.

## Statistics / Analytics

The analytics page is designed around these metrics:

- Total anime
- Average rating
- Anime watched this week
- Anime watched this month
- Top genres
- Monthly activity chart
- Rating distribution chart

## Planned / Ongoing Improvements

- Leaderboard page finalization
- Filter by genre
- Search and sort improvements
- Better analytics visualizations
- Landing page polish
- More detailed profile support

## Notes

This project is being built step by step, with focus on clean architecture:
- service files for database logic
- reusable UI components
- protected user-based data access
- separate pages for dashboard, history, analytics, and leaderboard

The goal is to create a personal anime tracker that feels like a real product, not just a practice project.
