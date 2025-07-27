# Email Reliability Implementation

This document outlines the email reliability improvements implemented in the OTG Football Academy registration system.

## Features Implemented

### 1. Retry Mechanism
- **Automatic Retries**: Up to 3 attempts for each email
- **Exponential Backoff**: Delays increase between retries (1s, 2s, 4s)
- **Separate Tracking**: Welcome and admin emails are retried independently

### 2. Email Queue System
- **Failed Email Queue**: In-memory storage for failed emails
- **Registration Tracking**: Each failed email is linked to a registration ID
- **Manual Retry**: API endpoint to retry failed emails

### 3. Enhanced Error Handling
- **Non-blocking Failures**: Registration continues even if emails fail
- **Detailed Logging**: Comprehensive logging for debugging
- **Status Reporting**: API responses include email delivery status

### 4. Monitoring Endpoints
- **Email Status API**: Check delivery status for specific registrations
- **Queue Management**: Admin endpoint for monitoring failed emails

## API Endpoints

### Registration API (`/api/register`)
**POST** - Register new participant
- Returns email status in response:
```json
{
  "success": true,
  "registrationId": "REG-20241226-ABC123",
  "emailStatus": {
    "welcomeEmail": "sent", // or "queued_for_retry"
    "adminEmail": "sent"     // or "queued_for_retry"
  }
}
```

**PUT** - Retry failed emails
```json
{
  "registrationId": "REG-20241226-ABC123"
}
```

### Email Status API (`/api/email-status`)
**GET** - Check email status
- Query parameter: `registrationId`

**POST** - Admin queue management
- Requires admin authentication

## Configuration

### Environment Variables
```env
RESEND_API_KEY=your_resend_api_key
SMTP_FROM=noreply@camp.offthegame.com
SMTP_TO=admin@offthegame.com
ADMIN_EMAIL_KEY=your_admin_key_for_queue_management
```

### Email Retry Settings
```typescript
const EMAIL_RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  backoffMultiplier: 2
};
```

## Production Recommendations

### 1. Database-Backed Queue
Replace in-memory queue with persistent storage:
- **Redis**: For high-performance queue management
- **PostgreSQL**: For integrated database solution
- **Bull Queue**: For advanced job processing

### 2. Webhook Integration
Set up Resend webhooks for real-time delivery status:
```typescript
// Example webhook endpoint
export async function POST(request: Request) {
  const event = await request.json();
  
  if (event.type === 'email.delivered') {
    // Update database with delivery confirmation
  } else if (event.type === 'email.bounced') {
    // Handle bounced emails
  }
}
```

### 3. Monitoring and Alerting
- **Health Checks**: Monitor email service availability
- **Metrics**: Track delivery rates and failure patterns
- **Alerts**: Notify admins of high failure rates

### 4. Advanced Retry Policies
```typescript
const ADVANCED_RETRY_CONFIG = {
  maxRetries: 5,
  retryDelays: [1000, 2000, 5000, 15000, 60000], // Custom delays
  deadLetterQueue: true, // For permanently failed emails
  retryConditions: {
    rateLimitError: { maxRetries: 10, delay: 60000 },
    temporaryFailure: { maxRetries: 3, delay: 5000 },
    permanentFailure: { maxRetries: 0 }
  }
};
```

### 5. Email Templates and Fallbacks
- **Template Versioning**: A/B test email templates
- **Fallback Templates**: Plain text versions for delivery issues
- **Personalization**: Dynamic content based on registration data

## Testing Email Reliability

### 1. Simulate Failures
```typescript
// Test retry mechanism
const mockFailingResend = {
  emails: {
    send: () => Promise.reject(new Error('Simulated failure'))
  }
};
```

### 2. Load Testing
- Test with high registration volumes
- Monitor queue performance
- Verify retry mechanisms under load

### 3. Integration Testing
```typescript
// Test complete flow
it('should handle email failures gracefully', async () => {
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(registrationData)
  });
  
  expect(response.status).toBe(200);
  const result = await response.json();
  expect(result.emailStatus).toBeDefined();
});
```

## Monitoring Dashboard

Consider implementing a dashboard to monitor:
- Email delivery rates
- Failed email queue status
- Retry success rates
- Registration completion rates

## Security Considerations

1. **API Authentication**: Secure admin endpoints
2. **Rate Limiting**: Prevent abuse of retry endpoints
3. **Data Privacy**: Ensure email content is handled securely
4. **Access Logs**: Monitor who accesses email management endpoints

## Troubleshooting

### Common Issues
1. **High Failure Rate**: Check Resend API status and limits
2. **Queue Buildup**: Monitor memory usage and implement cleanup
3. **Slow Retries**: Optimize retry delays for your use case

### Debug Commands
```bash
# Check email queue status
curl -X POST /api/email-status \
  -H "Content-Type: application/json" \
  -d '{"action": "queue_status", "adminKey": "your_key"}'

# Retry failed emails
curl -X PUT /api/register \
  -H "Content-Type: application/json" \
  -d '{"registrationId": "REG-20241226-ABC123"}'
```

This implementation provides a robust foundation for email reliability while maintaining system performance and user experience.