// Mapa explícit d'icones (Lucide) perquè el paquet només inclogui les que fem servir.
import {
  House, Recycle, Baby, Wallet, MicVocal, HeartHandshake, Trees, Users, ShoppingBasket, Megaphone,
  MessageCircleQuestionMark, Star, Search, Gift, HandHeart, Hand, Croissant, Coffee, UtensilsCrossed,
  ShoppingBag, Wrench, Scissors, Footprints, BookOpen, Armchair, School, Lightbulb, Droplets,
  CalendarCheck, Vote, Store, Sparkles, Bell, CalendarDays, MapPin, Clock, Ticket, Share, Bookmark,
  Check, X, ChevronRight, ArrowLeft, ArrowRight, Plus, Globe, Moon, Sun, Type, Contrast, LogOut, Lock,
  Mail, Shield, Phone, Info, LayoutGrid, Siren, Camera, Flag, Heart, MessageCircle, QrCode, BadgeCheck,
  TrendingUp, Route, Landmark, Mountain, Car, Compass, Bus, Pill, CloudSun, FileText, Accessibility,
  CircleUser, Settings, Download, Trash as Trash2, Send, Square, Copy, ThumbsUp, ThumbsDown, RotateCcw, MessagesSquare, ArrowUp, Mic, Paperclip, SquarePen, Euro, Award, CreditCard, ChevronDown, ListFilter as Filter, Eye, Navigation, HeartPulse, Briefcase, Leaf, Coins, Sparkle, Wand as Wand2, PartyPopper, WavesHorizontal as Waves,
  type LucideProps,
} from 'lucide-react';

const map = {
  House, Recycle, Baby, Wallet, MicVocal, HeartHandshake, Trees, Users, ShoppingBasket, Megaphone,
  MessageCircleQuestionMark, Star, Search, Gift, HandHeart, Hand, Croissant, Coffee, UtensilsCrossed,
  ShoppingBag, Wrench, Scissors, Footprints, BookOpen, Armchair, School, Lightbulb, Droplets,
  CalendarCheck, Vote, Store, Sparkles, Bell, CalendarDays, MapPin, Clock, Ticket, Share, Bookmark,
  Check, X, ChevronRight, ArrowLeft, ArrowRight, Plus, Globe, Moon, Sun, Type, Contrast, LogOut, Lock,
  Mail, Shield, Phone, Info, LayoutGrid, Siren, Camera, Flag, Heart, MessageCircle, QrCode, BadgeCheck,
  TrendingUp, Route, Landmark, Mountain, Car, Compass, Bus, Pill, CloudSun, FileText, Accessibility,
  CircleUser, Settings, Download, Trash2, Send, Square, Copy, ThumbsUp, ThumbsDown, RotateCcw, MessagesSquare, ArrowUp, Mic, Paperclip, SquarePen, Euro, Award, CreditCard, ChevronDown, Filter, Eye, Navigation, HeartPulse, Briefcase, Leaf, Coins, Sparkle, Wand2, PartyPopper, Waves,
};
export type IconName = keyof typeof map;

export function Icon({ name, size = 20, ...rest }: { name: IconName | string } & LucideProps) {
  const C = map[name as IconName] ?? Info;
  return <C size={size} strokeWidth={1.8} aria-hidden="true" {...rest} />;
}
