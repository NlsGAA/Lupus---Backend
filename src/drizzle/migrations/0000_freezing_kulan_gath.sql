CREATE TABLE "financial_bills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(150) NOT NULL,
	"value" varchar DEFAULT '0' NOT NULL,
	"due_date" varchar NOT NULL,
	"payment_key" varchar(150),
	"paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
