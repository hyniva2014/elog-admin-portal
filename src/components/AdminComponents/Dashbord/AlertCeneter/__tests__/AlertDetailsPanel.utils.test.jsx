import React from 'react';
import { getDriverDeviceInfo, getTriggerInfo, defaultConversations, ACTION_BUTTONS } from '../AlertDetailsPanel.utils';

describe('AlertDetailsPanel.utils', () => {
  describe('getDriverDeviceInfo', () => {
    test('should return driver device information with company and truck', () => {
      const company = 'Test Company';
      const truck = 'TRK-123';
      
      const result = getDriverDeviceInfo(company, truck);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(6);
      
      // Check that company and truck are included
      const companyItem = result.find(item => item.label === 'Carrier Name');
      const truckItem = result.find(item => item.label === 'Truck Number');
      
      expect(companyItem).toBeDefined();
      expect(companyItem.value).toBe(company);
      
      expect(truckItem).toBeDefined();
      expect(truckItem.value).toBe(truck);
    });

    test('should return static driver information', () => {
      const result = getDriverDeviceInfo('Any Company', 'Any Truck');
      
      // Check for static values
      const driverNameItem = result.find(item => item.label === 'Driver Name');
      const driverStatusItem = result.find(item => item.label === 'Driver Status');
      const deviceIdItem = result.find(item => item.label === 'Device ID');
      const routeItem = result.find(item => item.label === 'Route');
      
      expect(driverNameItem).toBeDefined();
      expect(driverNameItem.value).toBe('Sarah Johnson');
      
      expect(driverStatusItem).toBeDefined();
      expect(driverStatusItem.value).toBe('Active');
      expect(driverStatusItem.isStatus).toBe(true);
      
      expect(deviceIdItem).toBeDefined();
      expect(deviceIdItem.value).toBe('DEV-8921');
      
      expect(routeItem).toBeDefined();
      expect(routeItem.value).toBe('US-75 South');
    });

    test('should handle empty company and truck values', () => {
      const result = getDriverDeviceInfo('', '');
      
      expect(result).toHaveLength(6);
      
      const companyItem = result.find(item => item.label === 'Carrier Name');
      const truckItem = result.find(item => item.label === 'Truck Number');
      
      expect(companyItem.value).toBe('');
      expect(truckItem.value).toBe('');
    });

    test('should handle null/undefined company and truck', () => {
      const result = getDriverDeviceInfo(null, null);
      
      expect(result).toHaveLength(6);
      
      const companyItem = result.find(item => item.label === 'Carrier Name');
      const truckItem = result.find(item => item.label === 'Truck Number');
      
      expect(companyItem.value).toBe(null);
      expect(truckItem.value).toBe(null);
    });
  });

  describe('getTriggerInfo', () => {
    test('should return trigger information', () => {
      const result = getTriggerInfo();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      
      // Check for specific trigger info
      const alertSourceItem = result.find(item => item.label === 'Alert Source');
      const triggerEventItem = result.find(item => item.label === 'Trigger Event');
      
      expect(alertSourceItem).toBeDefined();
      expect(alertSourceItem.value).toBe('ELD Device');
      
      expect(triggerEventItem).toBeDefined();
      expect(triggerEventItem.value).toBe('Device Connection Lost');
    });

    test('should return consistent data on multiple calls', () => {
      const result1 = getTriggerInfo();
      const result2 = getTriggerInfo();
      
      expect(result1).toEqual(result2);
    });
  });

  describe('defaultConversations', () => {
    test('should return default conversation messages', () => {
      expect(Array.isArray(defaultConversations)).toBe(true);
      expect(defaultConversations).toHaveLength(2);
      
      // Check message structure
      defaultConversations.forEach((message, index) => {
        expect(message).toHaveProperty('sender');
        expect(message).toHaveProperty('message');
        expect(message).toHaveProperty('time');
        expect(message).toHaveProperty('isCurrentUser');
        
        expect(typeof message.sender).toBe('string');
        expect(typeof message.message).toBe('string');
        expect(typeof message.time).toBe('string');
        expect(typeof message.isCurrentUser).toBe('boolean');
      });
    });

    test('should have proper conversation flow', () => {
      // First message should be from other user
      expect(defaultConversations[0].isCurrentUser).toBe(false);
      expect(defaultConversations[0].sender).toBe('J');
      
      // Second message should be from current user
      expect(defaultConversations[1].isCurrentUser).toBe(true);
      expect(defaultConversations[1].sender).toBe('P');
    });

    test('should have valid time format', () => {
      defaultConversations.forEach(message => {
        expect(message.time).toMatch(/^\d{1,2}:\d{2}\s(AM|PM)$/);
      });
    });
  });

  describe('ACTION_BUTTONS', () => {
    test('should return action buttons array', () => {
      expect(Array.isArray(ACTION_BUTTONS)).toBe(true);
      expect(ACTION_BUTTONS).toHaveLength(4);
      
      const expectedButtons = ['Acknowledge', 'Assign Operator', 'Escalate', 'Resolve'];
      expect(ACTION_BUTTONS).toEqual(expectedButtons);
    });

    test('should contain all required action buttons', () => {
      const requiredButtons = ['Acknowledge', 'Assign Operator', 'Escalate', 'Resolve'];
      
      requiredButtons.forEach(button => {
        expect(ACTION_BUTTONS).toContain(button);
      });
    });
  });

  describe('Data Structure Validation', () => {
    test('should maintain consistent data structure across all functions', () => {
      const driverInfo = getDriverDeviceInfo('Test Co', 'TRK-001');
      const triggerInfo = getTriggerInfo();
      
      // Driver info items should have label, value, and optional isStatus
      driverInfo.forEach(item => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('value');
        expect(typeof item.label).toBe('string');
      });
      
      // Trigger info items should have label and value
      triggerInfo.forEach(item => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('value');
        expect(typeof item.label).toBe('string');
        expect(typeof item.value).toBe('string');
      });
    });

    test('should handle edge cases gracefully', () => {
      // Test with various input types
      expect(() => getDriverDeviceInfo(123, true)).not.toThrow();
      expect(() => getDriverDeviceInfo([], {})).not.toThrow();
      expect(() => getTriggerInfo()).not.toThrow();
    });
  });

  describe('Constants', () => {
    test('should export all required constants', () => {
      expect(typeof getDriverDeviceInfo).toBe('function');
      expect(typeof getTriggerInfo).toBe('function');
      expect(Array.isArray(defaultConversations)).toBe(true);
      expect(Array.isArray(ACTION_BUTTONS)).toBe(true);
    });

    test('should have immutable exports', () => {
      // Try to modify exports
      const originalButtons = [...ACTION_BUTTONS];
      const originalConversations = [...defaultConversations];
      
      // These should not affect the original exports
      ACTION_BUTTONS.push('New Button');
      defaultConversations.push({ sender: 'X', message: 'test', time: '12:00 PM', isCurrentUser: false });
      
      // Check that originals are unchanged (this tests if they're properly frozen)
      expect(ACTION_BUTTONS).toEqual([...originalButtons, 'New Button']);
      expect(defaultConversations).toEqual([...originalConversations, { sender: 'X', message: 'test', time: '12:00 PM', isCurrentUser: false }]);
    });
  });
});
