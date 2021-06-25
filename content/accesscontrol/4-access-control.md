---
title: "Access Control"
metaTitle: "Access Control"
metaDescription: "Access Control"
---

## Time Release of Asset

What if you are not releasing your product until the weekend, but you want it staged on the CDN before then?

Using the `anonymous` **access_type**, you can supply start and end dates, or just one of them to control public access to the asset.

## Exercise: Access Control Anonymous

Execute the script below to upload an asset with a **private** delivery type.

```bash
node access-control/upload-access-control/upload-asset-anon.js
```
The script below contains some date calculation functions using the **moment** library.  Both function returns the date as an `ISOString` which contains timezone set at 0 and looks like this `"2020-05-19T20:22:27.792Z"`.  The `addDays` accepts number of days to offset the current date and the `addSeconds` accepts the number of seconds to offset the current Date.
A pair of start and end dates are calculated and handed of to the Upload API using  the access control option.  This will have the effect of making the asset only available between start and end date.

```javascript
access_control: [
  { access_type: 'anonymous', start: startdate, end: enddate }
]
```
 
 Execute the upload script:

 ```bash
node access-control/upload-access-control/upload-asset-anon.js
 ```

The example is set up so that it won't be available until 45 seconds after it is uploaded.  Then it will only be available for 1 week after uploading. 

```javascript
const addDays = days => {
  return moment()
    .add(days, 'days')
    .toISOString()
}
// start this 45 seconds later
const addSeconds = seconds => {
  console.log(new Date())
  return moment().add(seconds, 'seconds').toISOString()
}
// set to expire after 7 days

const enddate = addDays(7)
const startdate = addSeconds(45)
console.log('oneweekfromtoday', enddate)
console.log('45 seconds from now', startdate)

cloudinary.uploader
  .upload('./assets/images/koi.jpg', {
    public_id: 'koi',
    type: 'upload',
    overwrite: true,
    invalidate: true,
    access_control: [
      { access_type: 'anonymous', start: startdate, end: enddate }
    ]
  })

```
The response will verify this access control timing.

```javascript
2020-03-24T00:16:11.085Z
oneweekfromtoday 2020-03-31T00:16:11.083Z
30 seconds from now 2020-03-24T00:16:56.089Z
{
  public_id: 'koi-1',
  version: 1585008972,
  signature: '6a77fcc2976cf523189a046cf71d59a16ec3ce0b',
  width: 5184,
  height: 3456,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2020-03-24T00:16:12Z',
  tags: [],
  bytes: 229072,
  type: 'upload',
  etag: '94b56aab4ec55d49cb0a33e3f29c9cbb',
  placeholder: false,
  url: 'http://res.cloudinary.com/pictures77/image/upload/v1585008972/koi-1.jpg',
  secure_url: 'https://res.cloudinary.com/pictures77/image/upload/v1585008972/koi-1.jpg',
  access_mode: 'public',
  access_control: [
    {
      access_type: 'anonymous',
      start: '2020-03-24T00:16:56Z',
      end: '2020-03-31T00:16:11Z'
    }
  ],
  original_filename: 'koi'
}
```

You can see that there is a set start and end time for this asset to be available.

![access control by time](https://res.cloudinary.com/cloudinary-training/image/upload/v1589920499/book/ac-ac-restricted-time.png)


**Note:** if you’re doing date calculations in JavaScript, use the moment library to avoid the effects of local timezone.
