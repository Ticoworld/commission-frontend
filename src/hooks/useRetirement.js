import { useMemo } from 'react';
import { daysUntil } from '../lib/utils';
import { RETIREMENT_WARNING_DAYS } from '../lib/constants';

/**
 * Calculate retirement status and priority for employees
 */
export const useRetirement = (retirementDate) => {
  return useMemo(() => {
    if (!retirementDate) {
      return {
        daysRemaining: null,
        priority: null,
        status: 'unknown',
        message: 'No retirement date set'
      };
    }

    const days = daysUntil(retirementDate);

    if (days < 0) {
      return {
        daysRemaining: days,
        priority: 'retired',
        status: 'retired',
        message: 'Already retired'
      };
    }

    if (days <= RETIREMENT_WARNING_DAYS.CRITICAL) {
      return {
        daysRemaining: days,
        priority: 'critical',
        status: 'critical',
        message: `${days} days until retirement`
      };
    }

    if (days <= RETIREMENT_WARNING_DAYS.WARNING) {
      return {
        daysRemaining: days,
        priority: 'warning',
        status: 'warning',
        message: `${days} days until retirement`
      };
    }

    if (days <= RETIREMENT_WARNING_DAYS.NORMAL) {
      return {
        daysRemaining: days,
        priority: 'normal',
        status: 'normal',
        message: `${days} days until retirement`
      };
    }

    return {
      daysRemaining: days,
      priority: null,
      status: 'active',
      message: 'Active employment'
    };
  }, [retirementDate]);
};
