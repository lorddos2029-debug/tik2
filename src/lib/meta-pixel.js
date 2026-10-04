export const META_PIXEL_ID = "1849843465686098";
export const initializeMetaPixel = () => {
    if (typeof window === "undefined")
        return;
    if (!window.fbq) {
        const fbq = ((...args) => {
            if (fbq.callMethod)
                fbq.callMethod(...args);
            else
                fbq.queue.push(args);
        });
        fbq.queue = [];
        fbq.loaded = true;
        fbq.version = "2.0";
        fbq.push = fbq;
        window.fbq = fbq;
        window._fbq = fbq;
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(script);
        fbq("init", META_PIXEL_ID);
    }
};
export const trackMetaEvent = (eventName, data, eventId) => {
    initializeMetaPixel();
    if (!window.fbq)
        return;
    const options = eventId ? { eventID: eventId } : undefined;
    window.fbq("track", eventName, data ?? {}, options);
};
