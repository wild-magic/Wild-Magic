import MailchimpSubscribe from 'react-mailchimp-subscribe';

const url =
  '//abovetheapi.us17.list-manage.com/subscribe/post?u=306f2f82dadeca12216fdbbf2&amp;id=3547470e1a';

// use the render prop and your custom form
const SubscribeForm = () => (
  <MailchimpSubscribe url={url} />

  // <MailchimpSubscribe
  //   url={url}
  //   render={({ subscribe, status, message }) => (
  //     <div>
  //       <MyForm onSubmitted={formData => subscribe(formData)} />
  //       {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
  //       {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
  //       {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
  //     </div>
  //   )}
  // />
);

export default SubscribeForm;
