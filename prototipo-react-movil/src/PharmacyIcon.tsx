import type { SVGProps } from 'react';

export function PharmacyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
 return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" className={[className,'pharmacy-service-icon'].filter(Boolean).join(' ')} {...props}><path d="M18 3h12v13h13v12H30v15H18V28H5V16h13z" /></svg>;
}
