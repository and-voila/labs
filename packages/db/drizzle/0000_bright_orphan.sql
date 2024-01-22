DO $$ BEGIN
 CREATE TYPE "admin_roles_enum" AS ENUM('admin', 'superadmin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "membership_roles_enum" AS ENUM('member', 'admin', 'owner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "stripe_subscriptions_status_enum" AS ENUM('active', 'canceled', 'expired', 'incomplete', 'past_due', 'paused', 'trialing', 'unpaid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_accounts" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "av_accounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_admins" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"role" "admin_roles_enum" NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_memberships" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"role" "membership_roles_enum" DEFAULT 'member' NOT NULL,
	"accepted" boolean DEFAULT false NOT NULL,
	"team_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_posts" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"content" text,
	"slug" varchar(255) NOT NULL,
	"image" text DEFAULT 'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/IoGBwOC-9CvtiYRSGCNZAuY0UAemMZ0UzFtuZ7.jpeg',
	"image_blur_hash" text DEFAULT 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
	"published" boolean DEFAULT false NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"team_id" varchar(255),
	"site_id" varchar(255) NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_sessions" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_sites" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"logo" text DEFAULT 'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/SgQEI5B-KRu6KULIVq8OXj0eKRn7drD4RRCGf1.png',
	"image" text DEFAULT 'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/qbRcbkW-GSx1IuBuKyVEbOJkFlkxBCVaCy5qfD.jpeg',
	"image_blur_hash" text DEFAULT 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
	"subdomain" varchar(255),
	"custom_domain" varchar(255),
	"font" varchar(255) DEFAULT 'font-cal',
	"message_404" text DEFAULT 'Oops! You found a page that does not exist.',
	"team_id" varchar(255) NOT NULL,
	"user_id" varchar(255),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "av_sites_subdomain_unique" UNIQUE("subdomain"),
	CONSTRAINT "av_sites_custom_domain_unique" UNIQUE("custom_domain")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_stripe_customer" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255),
	"team_id" varchar(255) NOT NULL,
	"stripe_customer_id" varchar(255),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now(),
	CONSTRAINT "av_stripe_customer_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "av_stripe_customer_team_id_unique" UNIQUE("team_id"),
	CONSTRAINT "av_stripe_customer_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_stripe_subscriptions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"team_id" varchar(255) NOT NULL,
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"status" "stripe_subscriptions_status_enum",
	"stripe_price_id" varchar(255),
	"stripe_current_period_end" timestamp (3),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now(),
	CONSTRAINT "av_stripe_subscriptions_team_id_unique" UNIQUE("team_id"),
	CONSTRAINT "av_stripe_subscriptions_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "av_stripe_subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id"),
	CONSTRAINT "av_stripe_subscriptions_stripe_price_id_unique" UNIQUE("stripe_price_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_team_invitations" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"team_id" varchar(255) NOT NULL,
	"team_slug" varchar(255) NOT NULL,
	"invited_by" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp (3) NOT NULL,
	"role" "membership_roles_enum" DEFAULT 'member' NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "av_team_invitations_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_teams" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"image" text DEFAULT 'https://xa09cquxuk1zok5f.public.blob.vercel-storage.com/SgQEI5B-KRu6KULIVq8OXj0eKRn7drD4RRCGf1.png',
	"image_blur_hash" text DEFAULT 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
	"is_personal" boolean DEFAULT false NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now(),
	CONSTRAINT "av_teams_name_unique" UNIQUE("name"),
	CONSTRAINT "av_teams_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"dislpay_name" text,
	"username" text,
	"email" text NOT NULL,
	"emailVerified" timestamp (3),
	"image" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "av_users_dislpay_name_unique" UNIQUE("dislpay_name"),
	CONSTRAINT "av_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "av_verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "av_verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "admin_user_id_idx" ON "av_admins" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "membership_user_id_site_id_idx" ON "av_memberships" ("user_id","team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "membership_team_id_idx" ON "av_memberships" ("team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "membership_user_id_idx" ON "av_memberships" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "post_slug_site_id_idx" ON "av_posts" ("slug","site_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_user_id_idx" ON "av_posts" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_site_id_idx" ON "av_posts" ("site_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "site_user_id_idx" ON "av_sites" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "site_team_id_idx" ON "av_sites" ("team_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stripe_subscription_team_id_idx" ON "av_stripe_subscriptions" ("team_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "invites_team_id_email_idx" ON "av_team_invitations" ("team_id","email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "invites_team_id_idx" ON "av_team_invitations" ("team_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "team_team_name_slug_unique_idx" ON "av_teams" ("name","slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_team_slug_idx" ON "av_teams" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "team_team_id_idx" ON "av_teams" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_user_email_idx" ON "av_users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_user_id_idx" ON "av_users" ("id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_accounts" ADD CONSTRAINT "av_accounts_userId_av_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."av_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_admins" ADD CONSTRAINT "av_admins_user_id_av_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."av_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_memberships" ADD CONSTRAINT "av_memberships_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."av_teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_memberships" ADD CONSTRAINT "av_memberships_user_id_av_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."av_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_posts" ADD CONSTRAINT "av_posts_user_id_av_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."av_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_posts" ADD CONSTRAINT "av_posts_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."av_teams"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_posts" ADD CONSTRAINT "av_posts_site_id_av_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."av_sites"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_sessions" ADD CONSTRAINT "av_sessions_userId_av_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."av_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_sites" ADD CONSTRAINT "av_sites_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."av_teams"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_sites" ADD CONSTRAINT "av_sites_user_id_av_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."av_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_stripe_customer" ADD CONSTRAINT "av_stripe_customer_user_id_av_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."av_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_stripe_customer" ADD CONSTRAINT "av_stripe_customer_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."av_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_stripe_subscriptions" ADD CONSTRAINT "av_stripe_subscriptions_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."av_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_stripe_subscriptions" ADD CONSTRAINT "av_stripe_subscriptions_stripe_customer_id_av_stripe_customer_stripe_customer_id_fk" FOREIGN KEY ("stripe_customer_id") REFERENCES "public"."av_stripe_customer"("stripe_customer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_team_invitations" ADD CONSTRAINT "av_team_invitations_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."av_teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_team_invitations" ADD CONSTRAINT "av_team_invitations_invited_by_av_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."av_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
