-- KEP v4.1 — Optional RLS tightening for migration/admin workflow
-- Run this after v4.0 schema if you want stricter content publishing rules.
-- Regular authenticated users can submit draft/submitted content.
-- Only admins/reviewers can insert or update approved/published content.

-- Questions
DROP POLICY IF EXISTS "questions_authenticated_submit" ON public.questions;
CREATE POLICY "questions_authenticated_submit" ON public.questions
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL
  AND (
    status IN ('draft','submitted','needs_review')
    OR public.is_admin()
  )
);

DROP POLICY IF EXISTS "questions_admin_update" ON public.questions;
CREATE POLICY "questions_admin_update" ON public.questions
FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Resources
DROP POLICY IF EXISTS "resources_authenticated_submit" ON public.resources;
CREATE POLICY "resources_authenticated_submit" ON public.resources
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL
  AND (
    status IN ('draft','submitted','needs_review')
    OR public.is_admin()
  )
);

DROP POLICY IF EXISTS "resources_admin_update" ON public.resources;
CREATE POLICY "resources_admin_update" ON public.resources
FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
