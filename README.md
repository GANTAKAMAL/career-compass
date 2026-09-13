# Career Compass

Build a modern, professional full-stack frontend UI for a project called:

Career Domain Intelligence Platform using Knowledge Graphs and Machine Learning

This is a college-level career intelligence platform that helps users understand their career domains, manage their skills, explore jobs, identify skill gaps, receive job recommendations, visualize job-skill knowledge graphs, and take skill assessments.

IMPORTANT:

For this first phase, focus ONLY on creating the frontend UI and application structure.

Do NOT create or modify any backend API.

Do NOT invent backend endpoints.

The backend will be an existing Spring Boot REST API running separately at:

http://localhost:8080

TECHNOLOGY:

- React

- TypeScript

- Vite

- Tailwind CSS

- shadcn/ui

- Lucide icons

- Responsive design

- Clean component-based architecture

DESIGN STYLE:

Create a professional modern SaaS-style interface suitable for a final-year B.Tech project demonstration.

Use:

- Clean white/light background

- Dark navy/blue primary text

- Professional blue accent color

- Subtle gradients where appropriate

- Rounded cards

- Soft shadows

- Clear typography

- Good spacing

- Modern dashboard design

- Professional charts/visualizations

- Responsive desktop, tablet and mobile layouts

Avoid:

- Excessive animations

- Cartoonish graphics

- Neon colors

- Overly colorful UI

- Unnecessary decorative elements

- Fake statistics

- Fake API data presented as real data

APPLICATION STRUCTURE:

1. AUTHENTICATION

Create:

- Login page

- Registration page

- Forgot password page UI

- Protected application layout

Login page should contain:

- Application logo/name

- Email field

- Password field

- Password must be masked

- Show/hide password button

- Login button

- Link to registration

- Link to forgot password

- Proper validation/error UI

Registration page:

- Full name

- Email

- Password

- Confirm password

- Masked password fields

- Show/hide password controls

- Register button

- Link back to login

2. MAIN APPLICATION LAYOUT

After login, create a professional dashboard layout with:

LEFT SIDEBAR:

- Dashboard

- My Profile

- My Skills

- Jobs

- Recommendations

- Skill Gaps

- Knowledge Graph

- Assessments

- Assessment Results

- Logout

TOP BAR:

- Page title

- User name

- User avatar/profile icon

- Notification icon

- Responsive mobile menu

3. DASHBOARD PAGE

Create a dashboard containing:

- Welcome section

- User profile summary

- Career goal

- Education

- Experience

- Skills summary

- Recommended jobs

- Skill match percentages

- Skill gap summary

- Assessment performance summary

Use cards and clean data visualization components.

Do not use hardcoded fake statistics as if they were real backend data.

Use appropriate empty/loading states where data will later come from the backend.

4. PROFILE PAGE

Create a profile page containing:

- Name

- Email

- Experience

- Education

- Career Goal

- Edit Profile button

- Save Changes button

- Skills section

Make the form professional and easy to use.

5. SKILLS PAGE

Create:

- Current skills list

- Add skill input

- Add Skill button

- Remove skill button

- Search/filter skills UI

- Empty state when no skills exist

6. JOBS PAGE

Create:

- Job search

- Job cards/table

- Job title

- Job description

- Required skills

- View Details button

Create a separate Job Details page with:

- Job title

- Description

- Required skills

- Match percentage

- Matching skills

- Missing skills

- Skill Gap section

- Knowledge Graph button

- Assessment button

7. RECOMMENDATIONS PAGE

Create a professional job recommendation interface.

Each recommendation should display:

- Job title

- Match percentage

- Matching skills

- Missing skills

- Explanation

- View Job button

Use a visual match indicator/progress bar.

8. SKILL GAP PAGE

Create a skill gap analysis interface showing:

- Target job

- Match percentage

- Matching skills

- Missing skills

- Skills to learn

- Progress visualization

9. KNOWLEDGE GRAPH PAGE

Create a dedicated page for visualizing:

Job → REQUIRES → Skill

The UI should support a graph visualization containing:

- Job node

- Skill nodes

- Relationships

- Zoom controls

- Pan controls

- Reset view

- Legend

The actual graph data will later come from the Spring Boot backend.

10. ASSESSMENTS PAGE

Create:

- List of assessments/questions

- Question card

- Multiple-choice options A/B/C/D

- Selected answer state

- Submit answer button

- Progress indicator

After submission, show:

- Score

- Correct/incorrect result

- Result summary

11. ASSESSMENT RESULTS PAGE

Create:

- Assessment history

- Score

- Result summary

- Assessment ID

- Date/time if available

- Performance visualization

12. RESPONSIVE DESIGN

The application must work properly on:

- Desktop

- Laptop

- Tablet

- Mobile

On mobile:

- Convert sidebar into a hamburger menu

- Maintain readable cards

- Make forms responsive

- Make tables horizontally scrollable when necessary

13. COMPONENT ARCHITECTURE

Create reusable components such as:

- Sidebar

- TopNavbar

- PageHeader

- StatCard

- SkillBadge

- JobCard

- MatchPercentage

- SkillList

- EmptyState

- LoadingState

- ErrorState

- ProtectedRoute

- Form components

- Modal/Dialog components

14. AUTHENTICATION STATE

Create the frontend authentication architecture so that it is ready to consume a JWT/token from the existing Spring Boot backend.

For now:

- Create authentication context/state

- Create protected routes

- Create logout handling

- Create token storage abstraction

Do not invent API behavior.

15. ERROR AND LOADING STATES

Every backend-dependent page should have:

- Loading state

- Empty state

- Error state

- Retry option where appropriate

16. CODE QUALITY

Keep the project:

- Clean

- Modular

- Maintainable

- TypeScript-based

- Reusable

- Professionally structured

Do not put the entire application in one component.

IMPORTANT FINAL REQUIREMENT:

This is the frontend for an existing Spring Boot backend.

The backend already has authentication and REST APIs.

The frontend should be designed so that API integration can be added later without restructuring the UI.

For this phase, prioritize:

1. UI

2. Navigation

3. Page structure

4. Responsive layout

5. Reusable components

6. Authentication screen design

7. Professional visual appearance

Do not implement fake backend functionality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0ae339c3-fc04-4804-ae11-1186264d4b18).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
