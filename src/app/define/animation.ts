import { trigger, animate, transition, style } from '@angular/animations';

export const fadeInList =
  trigger('fadeInList', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.5s ease-in-out', style({ opacity: 1 }))
    ])
  ]);

export const fadeInDetail =
  trigger('fadeInDetail', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.25s ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('.25s ease-in-out', style({ opacity: 0 }))
    ])
  ]);