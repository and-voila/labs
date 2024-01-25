ALTER TABLE "av_accounts" DROP CONSTRAINT "av_accounts_userId_av_users_id_fk";
--> statement-breakpoint
ALTER TABLE "av_admins" DROP CONSTRAINT "av_admins_user_id_av_users_id_fk";
--> statement-breakpoint
ALTER TABLE "av_memberships" DROP CONSTRAINT "av_memberships_team_id_av_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "av_posts" DROP CONSTRAINT "av_posts_user_id_av_users_id_fk";
--> statement-breakpoint
ALTER TABLE "av_sessions" DROP CONSTRAINT "av_sessions_userId_av_users_id_fk";
--> statement-breakpoint
ALTER TABLE "av_sites" DROP CONSTRAINT "av_sites_team_id_av_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "av_stripe_customer" DROP CONSTRAINT "av_stripe_customer_user_id_av_users_id_fk";
--> statement-breakpoint
ALTER TABLE "av_stripe_subscriptions" DROP CONSTRAINT "av_stripe_subscriptions_team_id_av_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "av_team_invitations" DROP CONSTRAINT "av_team_invitations_team_id_av_teams_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_accounts" ADD CONSTRAINT "av_accounts_userId_av_users_id_fk" FOREIGN KEY ("userId") REFERENCES "av_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_admins" ADD CONSTRAINT "av_admins_user_id_av_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "av_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_memberships" ADD CONSTRAINT "av_memberships_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "av_teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_posts" ADD CONSTRAINT "av_posts_user_id_av_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "av_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_sessions" ADD CONSTRAINT "av_sessions_userId_av_users_id_fk" FOREIGN KEY ("userId") REFERENCES "av_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_sites" ADD CONSTRAINT "av_sites_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "av_teams"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_stripe_customer" ADD CONSTRAINT "av_stripe_customer_user_id_av_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "av_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_stripe_subscriptions" ADD CONSTRAINT "av_stripe_subscriptions_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "av_teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "av_team_invitations" ADD CONSTRAINT "av_team_invitations_team_id_av_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "av_teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
