# Week 11 Optional Activity — Course Sessions Redesign

**Student:** Juan Jose Guzman Bohorquez  
**Project:** Attendance Control  
**Screen:** Professor's course sessions list

## Visual hierarchy and navigation

The screen identifies the selected course and gives **Create session** the most visual prominence. The session list appears below it. Each session opens a detail screen, where the professor can review the selected session.

The flow uses stack navigation. The professor opens a course, selects a session from its list, and uses **Back** to return to the list.

[Navigation flow](../workshop/docs/07-navigation-flow.md)

## List states

| State | Behavior | Evidence |
| --- | --- | --- |
| Loading | A loading indicator appears while the sessions are being retrieved. | [Loading screenshot](../workshop/docs/img/sessions-loading.png) |
| Populated | The screen displays the available sessions and lets the professor open a session detail. | [Session list at 360 px](../workshop/docs/img/sessions-360.png) |
| Error | The screen shows a message and offers a retry action. | [Error screenshot](../workshop/docs/img/sessions-error.png) |
| Empty | The screen explains that there are no sessions and keeps the create action available. | [Empty screenshot](../workshop/docs/img/sessions-empty.png) |

[State documentation](../workshop/docs/03-list-states.md)

## Accessibility and before/after

The review covers text contrast, touch target size, and how the layout fits at different screen widths.

- [Before — initial professor sessions screen](../workshop/docs/img/before-teacher-sessions.png)
- [After — redesigned screen at 360 px](../workshop/docs/img/sessions-360.png)
- [After — redesigned screen at 768 px](../workshop/docs/img/sessions-768.png)
- [Accessibility and responsive layout review](../workshop/docs/04-a11y-responsive.md)
- [Full before-and-after comparison](../workshop/docs/09-before-after.md)

## Run locally

From the repository root:

```bash
cd 11-week/workshop/app
npm ci
npm run dev
```

[Workshop implementation](../workshop/app/)
