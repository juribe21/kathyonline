import { CanDeactivateFn } from '@angular/router';
import { ClientProfile } from '../../features/clients/client-profile/client-profile';

export const preventUnsavedChangesGuard: CanDeactivateFn<ClientProfile> = (component) => {
  if (component.editForm?.dirty) {
    return confirm('Are ou sure you want to continue? All unsaved changes will be lost');
  }
  return true;
};
